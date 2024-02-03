import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { getUserByClerkID } from "@/util/auth";
import prisma from "@/util/db";

const getEntries = async () => {
  const user = await getUserByClerkID();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return entries;
};
const JournalPage = async () => {
  const entries = await getEntries();
  return (
    <div className=" bg-zinc-400/10 p-5">
      <h2 className="mb-8 text-3xl">Journal</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
