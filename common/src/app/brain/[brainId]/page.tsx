import { getBrainContentById } from "@/lib/fetchData";
import { getUser } from "@/lib/getCustomData";

async function getBrainContent(brainId: string) {
  const user = await getUser();
  const token = user?.token || "";
  const { error, data, message } = await getBrainContentById(brainId, token);
  return { error, data, message };
}

export async function BrainContentPreview({
  params,
}: {
  params: Promise<{ brainId: string }>;
}) {
  const brainId = (await params).brainId;
  const { error, data, message } = await getBrainContent(brainId);

  if (error === true && data === null) {
    return (
      <div className="pl-14 pt-6 flex">
        <h1>{message}</h1>
      </div>
    );
  }

  if (error === false && data !== null) {
    return;
  }
}
