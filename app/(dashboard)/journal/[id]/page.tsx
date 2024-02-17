import Editor from "@/components/Editor";
import { getUserByClerkID } from "@/util/auth";
import prisma from "@/util/db";
import { JournalEntry } from "@prisma/client";

const getEntry = async (id: string) => {
  const user = await getUserByClerkID();
  if (!user) return;

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId: user.id,
      id,
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};

const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id);
  const { mood, summary, subject, color, negative } = entry?.analysis;

  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
  ];

  return (
    <div className="grid h-full w-full grid-cols-3 gap-2">
      <div className="col-span-2">
        <Editor entry={entry as JournalEntry} />
      </div>
      <div className="col-span-1 border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex flex-col items-start border-t border-black/10 px-2 py-4"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span className="text-md">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
