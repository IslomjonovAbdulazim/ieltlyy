import Link from 'next/link';
import { cn } from "@/lib/utils"; // Assuming a utility for classnames exists, as is common with shadcn/ui. If not, this can be removed.

interface Result {
  rank?: number;
  initials: string;
  name: string;
  date: string;
  overall: number | string;
  listening: number | string;
  reading: number | string;
  writing: number | string;
  speaking: number | string;
  avatarBg: string;
}

const topResultsData: Result[] = [
  {
    rank: 1,
    initials: 'BI',
    name: 'Bekhruz Ilhomov',
    date: 'Sep 11',
    overall: 8.5,
    listening: 9,
    reading: 9,
    writing: 7,
    speaking: 8,
    avatarBg: 'bg-yellow-400',
  },
  {
    rank: 2,
    initials: 'BO',
    name: 'Bekzod Oripov',
    date: 'Sep 6',
    overall: 8.5,
    listening: 8.5,
    reading: 9,
    writing: 8,
    speaking: 8,
    avatarBg: 'bg-gray-400',
  },
  {
    rank: 3,
    initials: 'AB',
    name: 'Asrorbek Bahromjonov',
    date: 'Sep 2',
    overall: 8.0,
    listening: 8.5,
    reading: 9,
    writing: 6.5,
    speaking: 7,
    avatarBg: 'bg-indigo-400',
  },
  {
    rank: 4,
    initials: 'NR',
    name: 'Nurbek Rustamov',
    date: 'Sep 9',
    overall: 8.0,
    listening: 7.5,
    reading: 8.5,
    writing: 6.5,
    speaking: 7,
    avatarBg: 'bg-gray-400',
  },
  {
    rank: 5,
    initials: 'IA',
    name: 'IRODA ABDUMALIKOVA',
    date: 'Aug 31',
    overall: 7.5,
    listening: 7,
    reading: 8,
    writing: 7.5,
    speaking: 7,
    avatarBg: 'bg-gray-400',
  },
];

const recentResultsData: Result[] = [
  {
    initials: 'DA',
    name: 'Di***ra Ar***va',
    date: '22h',
    overall: 6.5,
    listening: 7,
    reading: 7,
    writing: 5,
    speaking: 7,
    avatarBg: 'bg-indigo-400',
  },
  {
    initials: 'I',
    name: 'In*****ct',
    date: '1d',
    overall: 5.5,
    listening: 5.5,
    reading: 4,
    writing: 6,
    speaking: 6,
    avatarBg: 'bg-indigo-400',
  },
  {
    initials: 'I',
    name: 'In*****ct',
    date: '1d',
    overall: 5.5,
    listening: 5.5,
    reading: 4,
    writing: 6.5,
    speaking: 6,
    avatarBg: 'bg-indigo-400',
  },
  {
    initials: 'I',
    name: 'In*****ct',
    date: '1d',
    overall: 4,
    listening: 4.5,
    reading: 5,
    writing: 6,
    speaking: 1,
    avatarBg: 'bg-indigo-400',
  },
  {
    initials: 'I',
    name: 'In*****ct',
    date: '1d',
    overall: 6.5,
    listening: 6.5,
    reading: 5.5,
    writing: 6.5,
    speaking: 7,
    avatarBg: 'bg-indigo-400',
  },
];

const ScoreColumn = ({ label, score }: { label: string; score: number | string }) => (
  <div className="flex flex-col items-center">
    <span className="text-xs text-text-secondary">{label}</span>
    <span className="font-semibold text-text-primary text-sm">{score}</span>
  </div>
);

const ResultRow = ({ result, isLast, hasRank }: { result: Result; isLast: boolean; hasRank: boolean; }) => {
  return (
    <div className={cn("flex items-center py-3", !isLast && "border-b border-border-gray")}>
      <div className="flex items-center gap-3 sm:gap-4 flex-1">
        {hasRank && <span className="w-6 text-center text-gray-500 font-medium">{result.rank}</span>}
        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0", result.avatarBg)}>
          {result.initials}
        </div>
        <div>
          <p className="font-semibold text-text-primary text-sm">{result.name}</p>
          <p className="text-xs text-text-secondary">{result.date}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 md:gap-6">
        <div className="bg-brand-primary text-white font-bold text-base rounded-md px-3 py-0.5">
          {result.overall}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <ScoreColumn label="L" score={result.listening} />
          <ScoreColumn label="R" score={result.reading} />
          <ScoreColumn label="W" score={result.writing} />
          <ScoreColumn label="S" score={result.speaking} />
        </div>
      </div>
    </div>
  );
};

export default function ResultsLeaderboard() {
  const showTopResults = topResultsData.length > 0;
  const showRecentResults = recentResultsData.length > 0;

  return (
    <div className="bg-background-light py-16 sm:py-20 font-primary">
      <div className="container">
        {/* Top results */}
        <div id="top-results">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-text-primary">top results of last 30 days</h2>
            <Link href="/top-results" className="self-start sm:self-auto border border-gray-400 text-gray-700 rounded-full px-6 py-2 text-sm font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">
              View Full Rating
            </Link>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-border-gray p-2 sm:p-4">
            {showTopResults ? (
              <div>
                {topResultsData.map((result, index) => (
                  <ResultRow key={result.rank} result={result} isLast={index === topResultsData.length - 1} hasRank={true} />
                ))}
              </div>
            ) : (
              <p className="text-text-secondary text-center py-8">No results available for the last 30 days.</p>
            )}
          </div>
        </div>
        
        {/* Recent results */}
        <div id="recent-results" className="mt-16">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-6">
            <h2 className="text-3xl font-bold text-text-primary">recent results</h2>
            <p className="text-text-secondary sm:text-right">Latest IELTS exam scores from our students</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-border-gray p-2 sm:p-4">
            {showRecentResults ? (
              <div>
                {recentResultsData.map((result, index) => (
                  <ResultRow key={index} result={result} isLast={index === recentResultsData.length - 1} hasRank={false}/>
                ))}
              </div>
            ) : (
              <p className="text-text-secondary text-center py-8">No recent results available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}