'use client';

import { generateByImageURLFlow } from '@/app/genkit';
import { useState } from 'react';

export default function Home() {
  const [judgement, setJudgement] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function getJudgement(formData: FormData) {
    setLoading(true);
    const url = formData.get('url')?.toString() ?? '';
    const suggestion = await generateByImageURLFlow(url);
    setJudgement(suggestion);
    setLoading(false);
  }

  return (
    <main className="w-screen min-h-screen flex justify-center items-center bg-gray-900 flex-col">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await getJudgement(formData);
        }}
        className="border border-gray-200 rounded-2xl p-8 w-1/2"
      >
        <label
          htmlFor="url"
          className="text-white text-xl font-bold flex flex-col gap-4"
        >
          Buat Puisi Berdasarkan Gambar:
          <input
            type="text"
            name="url"
            id="url"
            className="border border-gray-500  text-lg px-4 py-2 outline-none focus:border-white rounded-lg"
            required
            placeholder="Insert URL"
            autoComplete="off"
          />
        </label>
        <button
          type="submit"
          className={`bg-white text-gray-900 px-4 py-2 rounded-lg mt-4 ${
            loading && 'opacity-70'
          }`}
        >
          {loading ? (
            <div className="animate-pulse">Loading...</div>
          ) : (
            'Generate'
          )}
        </button>
        {!loading && judgement && (
          <div className="mt-8">
            <h4 className="text-white font-bold">Result:</h4>
            <p className="text-gray-400 mt-2">{judgement}</p>
          </div>
        )}
      </form>
    </main>
  );
}
