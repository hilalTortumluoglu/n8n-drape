import { useState } from 'react';
import { Download, Share2, BookOpen, RotateCw, Sparkles } from 'lucide-react';
import Logo from '../components/layout/Logo';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import UploadZone from '../components/ui/UploadZone';
import { generateImage, fileToBase64 } from '../lib/api';

const FABRIC_TYPES = ['Cotton', 'Silk', 'Linen', 'Denim', 'Wool', 'Leather', 'Chiffon', 'Other'];

const MODEL_GALLERY = [
  'https://pbs.twimg.com/media/EsDAuL8WMAITZsE.jpg',
  'https://dfashionmagazine.com/images/model/img_1747068224.jpg',
  'https://iavogue.tmgrup.com.tr/original/25-06/27/_oby0445.jpg',
];

export default function Studio() {
  const [sketchFile, setSketchFile] = useState<File | null>(null);
  const [sketchUrl, setSketchUrl] = useState('');
  const [sketchPreview, setSketchPreview] = useState('');

  const [modelFile, setModelFile] = useState<File | null>(null);
  const [modelUrl, setModelUrl] = useState('');
  const [selectedModelIndex, setSelectedModelIndex] = useState<number | null>(null);
  const [modelPreview, setModelPreview] = useState('');

  const [fabricType, setFabricType] = useState('Cotton');
  const [customFabric, setCustomFabric] = useState('');

  const [modelTab, setModelTab] = useState<'gallery' | 'upload'>('gallery');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [isFabricEnabled, setIsFabricEnabled] = useState(true);
  const [error, setError] = useState('');

  const handleSketchFile = async (file: File) => {
    setSketchFile(file);
    const preview = await fileToBase64(file);
    setSketchPreview(preview);
    setSketchUrl('');
  };

  const handleModelFile = async (file: File) => {
    setModelFile(file);
    const preview = await fileToBase64(file);
    setModelPreview(preview);
    setSelectedModelIndex(null);
  };

  const handleGenerate = async () => {
    setError('');
    setIsGenerating(true);

    try {
      let sketchImage = sketchUrl || sketchPreview;
      let modelImage = modelUrl || modelPreview || (selectedModelIndex !== null ? MODEL_GALLERY[selectedModelIndex] : '');

      if (!sketchImage || !modelImage) {
        setError('Please upload both a sketch and select a model');
        setIsGenerating(false);
        return;
      }

      const fabric = isFabricEnabled ? (fabricType === 'Other' ? customFabric : fabricType) : undefined;

      const resultUrl = await generateImage({
        query: [sketchImage, modelImage],
        ...(fabric && { fabric }),
      });

      setGeneratedImage(resultUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;
    try {
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `drape-design-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Download failed. Please try right-clicking the image and saving it.');
    }
  };

  const handleShare = async () => {
    if (!generatedImage) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My DRAPE Design',
          text: 'Check out this design I created with DRAPE AI!',
          url: generatedImage,
        });
      } catch (err) {
        console.log('Share failed or cancelled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(generatedImage);
        alert('Image link copied to clipboard!');
      } catch (err) {
        console.error('Copy failed:', err);
      }
    }
  };

  const handleAddToLookbook = () => {
    if (!generatedImage) return;
    // In a real app, this would save to a database or local storage
    alert('Design added to your Lookbook!');
  };

  const canGenerate = (sketchFile || sketchUrl) && (modelFile || modelUrl || selectedModelIndex !== null);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b border-border bg-white px-6 py-4 flex items-center justify-between">
        <Logo />

        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium border-b-2 border-gold">
            Sketch to Model
          </button>
          <button className="px-4 py-2 text-sm font-medium text-muted hover:text-charcoal transition-colors relative group" disabled>
            Virtual Try-On ✦
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-charcoal text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Coming Soon
            </span>
          </button>
          <button className="px-4 py-2 text-sm font-medium text-muted hover:text-charcoal transition-colors relative group" disabled>
            Runway Anim. ✦
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-charcoal text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Coming Soon
            </span>
          </button>
          <button className="px-4 py-2 text-sm font-medium text-muted hover:text-charcoal transition-colors relative group" disabled>
            Scene Gen. ✦
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-charcoal text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Coming Soon
            </span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted">48 credits left</span>
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-charcoal font-semibold">
            U
          </div>
        </div>
      </div>

      <div className="flex-1 grid md:grid-cols-2 overflow-hidden">
        <div className="p-6 space-y-4 overflow-y-auto">
          <div>
            <h2 className="text-lg font-semibold mb-3">1. Upload Your Design</h2>
            <UploadZone
              onFileSelect={handleSketchFile}
              label="Drop sketch here"
            />
            {sketchPreview && (
              <div className="mt-2">
                <img src={sketchPreview} alt="Sketch preview" className="max-h-32 mx-auto rounded border border-border" />
              </div>
            )}
            <div className="mt-4">
              <Input
                placeholder="Or paste image URL"
                value={sketchUrl}
                onChange={(e) => {
                  setSketchUrl(e.target.value);
                  setSketchFile(null);
                  setSketchPreview('');
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">2. Fabric Type (Optional)</h2>
              <button
                onClick={() => setIsFabricEnabled(!isFabricEnabled)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${isFabricEnabled ? 'bg-gold/10 border-gold text-charcoal' : 'bg-slate-100 border-transparent text-muted'
                  }`}
              >
                {isFabricEnabled ? 'Enabled ✓' : 'Disabled'}
              </button>
            </div>
            {isFabricEnabled && (
              <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex flex-wrap gap-1.5">
                  {FABRIC_TYPES.map((fabric) => (
                    <button
                      key={fabric}
                      onClick={() => setFabricType(fabric)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-all ${fabricType === fabric
                        ? 'bg-gold border-gold text-charcoal'
                        : 'border-border hover:border-gold'
                        }`}
                    >
                      {fabric}
                    </button>
                  ))}
                </div>
                {fabricType === 'Other' && (
                  <div className="mt-2">
                    <Input
                      placeholder="Describe your fabric..."
                      className="text-sm h-9"
                      value={customFabric}
                      onChange={(e) => setCustomFabric(e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">3. Choose Your Model</h2>
            <div className="flex gap-4 mb-2 text-sm">
              <button
                onClick={() => setModelTab('gallery')}
                className={`pb-2 border-b-2 transition-colors ${modelTab === 'gallery' ? 'border-gold' : 'border-transparent'
                  }`}
              >
                Select from Gallery
              </button>
              <button
                onClick={() => setModelTab('upload')}
                className={`pb-2 border-b-2 transition-colors ${modelTab === 'upload' ? 'border-gold' : 'border-transparent'
                  }`}
              >
                Upload Your Model
              </button>
            </div>

            {modelTab === 'gallery' ? (
              <div className="grid grid-cols-3 gap-4">
                {MODEL_GALLERY.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedModelIndex(index);
                      setModelFile(null);
                      setModelPreview('');
                    }}
                    className={`aspect-[2/3] rounded-lg overflow-hidden border-2 transition-all ${selectedModelIndex === index
                      ? 'border-gold'
                      : 'border-border hover:border-gold'
                      }`}
                  >
                    <img src={url} alt={`Model ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            ) : (
              <>
                <UploadZone
                  onFileSelect={handleModelFile}
                  label="Drop model photo"
                />
                {modelPreview && (
                  <div className="mt-2">
                    <img src={modelPreview} alt="Model preview" className="max-h-32 mx-auto rounded border border-border" />
                  </div>
                )}
                <div className="mt-4">
                  <Input
                    placeholder="Or paste image URL"
                    value={modelUrl}
                    onChange={(e) => {
                      setModelUrl(e.target.value);
                      setModelFile(null);
                      setModelPreview('');
                      setSelectedModelIndex(null);
                    }}
                  />
                </div>
              </>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <RotateCw size={16} className="mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={16} className="mr-2" />
                Generate ✦
              </>
            )}
          </Button>
        </div>

        <div className="bg-white border-l border-border p-8 flex flex-col items-center justify-start pt-12">
          {generatedImage ? (
            <div className="w-full space-y-4">
              <div className="relative flex justify-center bg-slate-50 rounded-lg p-2">
                <img
                  src={generatedImage}
                  alt="Generated design"
                  className="max-h-[90vh] w-auto rounded-lg shadow-2xl object-contain shadow-black/10"
                />
                <div className="absolute bottom-4 right-4 text-xs text-white/70 bg-black/30 px-2 py-1 rounded">
                  Generated with DRAPE
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleDownload}>
                  <Download size={16} className="mr-2" />
                  Download HD
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleAddToLookbook}>
                  <BookOpen size={16} className="mr-2" />
                  Add to Lookbook
                </Button>
                <Button variant="outline" onClick={handleGenerate} disabled={isGenerating}>
                  <RotateCw size={16} />
                </Button>
              </div>
            </div>
          ) : isGenerating ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
              <p className="text-muted">Creating your design...</p>
            </div>
          ) : (
            <div className="text-center space-y-4 max-w-md">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-ivory to-border rounded-full flex items-center justify-center">
                <Sparkles size={48} className="text-gold" />
              </div>
              <p className="text-muted text-lg">Your design will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
