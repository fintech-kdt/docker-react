import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["musics"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/musics`
      );
      return response.data;
    },
  });
  return (
    <>
      <h1>My Music List</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data && (
        <div>
          {data.map((music: { id: number; title: string; artist: string }) => (
            <div
              style={{ display: "flex", gap: 24, justifyContent: "center" }}
              key={music.id}
            >
              <span>제목 : {music.title}</span>
              <span>수정 : {music.artist}</span>
              <Link to={`/edit/${music.id}`}>자세히</Link>
            </div>
          ))}
          <div style={{ marginTop: 24 }}>
            <Link to="/create">추가</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
