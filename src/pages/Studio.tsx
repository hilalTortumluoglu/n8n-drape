import { useState } from 'react';
import { Download, Share2, BookOpen, RotateCw, Sparkles } from 'lucide-react';
import Logo from '../components/layout/Logo';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import UploadZone from '../components/ui/UploadZone';
import { generateImage, fileToBase64 } from '../lib/api';

const FABRIC_TYPES = ['Cotton', 'Silk', 'Linen', 'Denim', 'Wool', 'Leather', 'Chiffon', 'Other'];

const MODEL_GALLERY = [
  'https://picsum.photos/seed/model1/200/300',
  'https://picsum.photos/seed/model2/200/300',
  'https://picsum.photos/seed/model3/200/300',
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

      const fabric = fabricType === 'Other' ? customFabric : fabricType;

      const resultUrl = await generateImage({
        quey: [sketchImage, modelImage],
        fabric,
      });

      setGeneratedImage(resultUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
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

      <div className="flex-1 grid md:grid-cols-2">
        <div className="p-8 space-y-8 overflow-y-auto">
          <div>
            <h2 className="text-xl font-semibold mb-4">1. Upload Your Design</h2>
            <UploadZone
              onFileSelect={handleSketchFile}
              label="Drop your clothing sketch here"
            />
            {sketchPreview && (
              <div className="mt-4">
                <img src={sketchPreview} alt="Sketch preview" className="w-full rounded border border-border" />
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
            <h2 className="text-xl font-semibold mb-4">2. Select Fabric Type</h2>
            <div className="flex flex-wrap gap-2">
              {FABRIC_TYPES.map((fabric) => (
                <button
                  key={fabric}
                  onClick={() => setFabricType(fabric)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    fabricType === fabric
                      ? 'bg-gold border-gold text-charcoal'
                      : 'border-border hover:border-gold'
                  }`}
                >
                  {fabric}
                </button>
              ))}
            </div>
            {fabricType === 'Other' && (
              <div className="mt-4">
                <Input
                  placeholder="Describe your fabric..."
                  value={customFabric}
                  onChange={(e) => setCustomFabric(e.target.value)}
                />
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">3. Choose Your Model</h2>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setModelTab('gallery')}
                className={`pb-2 border-b-2 transition-colors ${
                  modelTab === 'gallery' ? 'border-gold' : 'border-transparent'
                }`}
              >
                Select from Gallery
              </button>
              <button
                onClick={() => setModelTab('upload')}
                className={`pb-2 border-b-2 transition-colors ${
                  modelTab === 'upload' ? 'border-gold' : 'border-transparent'
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
                    className={`aspect-[2/3] rounded-lg overflow-hidden border-2 transition-all ${
                      selectedModelIndex === index
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
                  label="Drop your model photo here"
                />
                {modelPreview && (
                  <div className="mt-4">
                    <img src={modelPreview} alt="Model preview" className="w-full rounded border border-border" />
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

        <div className="bg-white border-l border-border p-8 flex items-center justify-center">
          {generatedImage ? (
            <div className="w-full space-y-4">
              <div className="relative">
                <img src={generatedImage} alt="Generated design" className="w-full rounded-lg shadow-2xl" />
                <div className="absolute bottom-4 right-4 text-xs text-white/70 bg-black/30 px-2 py-1 rounded">
                  Generated with DRAPE
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download size={16} className="mr-2" />
                  Download HD
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1">
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
