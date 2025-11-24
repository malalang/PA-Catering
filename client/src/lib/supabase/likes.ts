import { createClient } from './client';

export const getLikeCount = async (table: string, id: string) => {
  const supabaseBrowser = createClient();
  const { data, error } = await supabaseBrowser
    .from(table)
    .select('likes')
    .eq('id', id)
    .single();
  if (error) throw error;
  return (data as any)?.likes?.length ?? 0;
};

export const toggleLike = async (table: string, id: string, userId: string) => {
  const supabaseBrowser = createClient();

  // Fetch current likes
  const { data: current, error: fetchErr } = await supabaseBrowser
    .from(table)
    .select('likes')
    .eq('id', id)
    .single();

  if (fetchErr) throw fetchErr;

  const currentLikes = (current as any)?.likes ?? [];
  const hasLiked = currentLikes.includes(userId);

  let newLikes;
  if (hasLiked) {
    newLikes = currentLikes.filter((uid: string) => uid !== userId);
  } else {
    newLikes = [...currentLikes, userId];
  }

  const { data, error } = await supabaseBrowser
    .from(table)
    .update({ likes: newLikes } as never)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};
