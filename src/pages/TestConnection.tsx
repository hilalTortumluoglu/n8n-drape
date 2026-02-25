import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Logo from '../components/layout/Logo';
import Input from '../components/ui/Input';
import { Sparkles, Send, AlertCircle, CheckCircle, Globe, Terminal } from 'lucide-react';

export default function TestConnection() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState(import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook-test/b95de125-30b9-40cd-a83d-b689ae6bbddf');

    const testWebhook = async () => {
        setStatus('loading');
        setError(null);
        setResponse(null);

        try {
            console.log('%c[TEST] Connecting to:', 'color: #d4af37; font-weight: bold;', url);
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    test: true,
                    query: ["test_sketch", "test_model"],
                    fabric: "TestFabric",
                    timestamp: new Date().toISOString()
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            setResponse(data);
            setStatus('success');
        } catch (err) {
            console.error('Test Request Failed:', err);
            setError(err instanceof Error ? err.message : 'Unknown error occurred');
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-ivory flex flex-col p-8 font-sans">
            <div className="mb-8">
                <Logo />
            </div>

            <div className="max-w-3xl mx-auto w-full space-y-8 bg-white p-8 rounded-lg shadow-sm border border-border">
                <div className="text-center">
                    <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
                        <Sparkles className="text-gold" />
                        n8n Gelişmiş Bağlantı Testi
                    </h1>
                    <p className="text-muted mt-2">
                        404 alıyorsanız n8n'de bu yolun tanımlı olduğundan ve Webhook node'unun "Listen" durumunda olduğundan emin olun.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold flex items-center gap-2">
                            <Globe size={16} className="text-muted" />
                            Webhook URL (Buradan değiştirebilirsiniz):
                        </label>
                        <Input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="http://localhost:5678/..."
                            className="font-mono text-sm"
                        />
                        <p className="text-[10px] text-muted-foreground italic">
                            * Eğer 404 almaya devam ederseniz, localhost yerine bilgisayarınızın yerel IP adresini (örn: 192.168.1.50) deneyin.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="p-3 bg-slate-50 rounded border flex flex-col gap-1">
                            <span className="font-bold text-slate-500 uppercase flex items-center gap-1">
                                <Terminal size={12} />
                                Method
                            </span>
                            <span>POST</span>
                        </div>
                        <div className="p-3 bg-slate-50 rounded border flex flex-col gap-1">
                            <span className="font-bold text-slate-500 uppercase">Content-Type</span>
                            <span>application/json</span>
                        </div>
                    </div>

                    <Button
                        onClick={testWebhook}
                        disabled={status === 'loading'}
                        className="w-full h-12 text-lg font-semibold"
                    >
                        {status === 'loading' ? 'İstek Gönderiliyor...' : 'Bağlantıyı Şimdi Test Et'}
                        <Send size={18} className="ml-2" />
                    </Button>
                </div>

                {status === 'success' && (
                    <div className="p-6 bg-green-50 border border-green-200 rounded-md animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center gap-2 text-green-700 font-bold mb-3">
                            <CheckCircle size={24} />
                            BAĞLANTI BAŞARILI!
                        </div>
                        <p className="text-sm text-green-600 mb-4">n8n yanıt verdi ve veri başarıyla alındı:</p>
                        <pre className="text-xs bg-black/5 p-4 rounded-md overflow-x-auto font-mono text-slate-800 border border-green-100">
                            {JSON.stringify(response, null, 2)}
                        </pre>
                    </div>
                )}

                {status === 'error' && (
                    <div className="p-6 bg-red-50 border border-red-200 rounded-md animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="flex items-center gap-2 text-red-700 font-bold mb-3">
                            <AlertCircle size={24} />
                            BAĞLANTI HATASI (404 veya Diğer)
                        </div>
                        <p className="text-sm text-red-600 font-mono bg-white inline-block px-2 py-1 rounded border border-red-100 mb-4">
                            {error}
                        </p>

                        <div className="space-y-3 text-sm text-slate-700">
                            <p className="font-semibold">Neden 404 Alıyor Olabilirsiniz?</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>n8n tarafında Webhook node içindeki <strong>"Listen for Test Event"</strong> butonu aktif olmayabilir.</li>
                                <li>n8n URL'indeki <strong>ID (b95de125...)</strong> değişmiş olabilir, lütfen node'u açıp kontrol edin.</li>
                                <li>HTTP Method n8n tarafında <strong>POST</strong> olarak ayarlanmamış olabilir.</li>
                                <li>Eğer Docker kullanıyorsanız, n8n `localhost` yerine makinenin asıl IP adresini bekliyor olabilir.</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
