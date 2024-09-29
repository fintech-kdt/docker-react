import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const FormPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["musics", id],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/musics/${id}`
      );
      return response.data;
    },
    enabled: !!id,
  });
  const [music, setMusic] = useState({
    title: "",
    artist: "",
  });
  useEffect(() => {
    if (data) setMusic(data);
  }, [data]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const updateMusic = useMutation({
    mutationFn: async (music: { title: string; artist: string }) => {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/musics/${id}`,
        music
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/");
    },
  });
  const createMusic = useMutation({
    mutationFn: async (music: { title: string; artist: string }) => {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/musics`, music);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/");
    },
  });
  const deleteMusic = useMutation({
    mutationFn: async () => {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/musics/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      navigate("/");
    },
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updateMusic.mutateAsync(music);
    } else {
      await createMusic.mutateAsync(music);
    }
  };
  const handleDelete = async () => {
    await deleteMusic.mutateAsync();
  };
  return (
    <>
      <h1>{id ? "음악 수정" : "음악 추가"}</h1>
      <form onSubmit={handleSumbit}>
        <input
          value={music.title}
          onChange={(e) => setMusic({ ...music, title: e.target.value })}
          placeholder="제목"
        />
        <br />
        <input
          value={music.artist}
          onChange={(e) => setMusic({ ...music, artist: e.target.value })}
          placeholder="가수"
        />
        <br />
        <div>
          <button type="submit">{id ? "수정" : "추가"}</button>
          <button type="button" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </form>
      <div style={{ marginTop: 24 }}>
        <Link to="/">목록으로</Link>
      </div>
    </>
  );
};

export default FormPage;
