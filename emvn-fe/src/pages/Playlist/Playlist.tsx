import { useState } from "react";
import {
  REST_API_PLAYLISTS,
  useGetAllPlaylists,
  useGetOnePlaylist,
  useUpdatePlaylist,
} from "../../api";
import { Select, Space, Spin, Table, Typography, notification } from "antd";
import { playlistColumns } from "./Playlist.config";
import { useQueryClient } from "react-query";

const { Title } = Typography;

export const Playlist = () => {
  const queryClient = useQueryClient();

  const [playlistSearch, setPlaylistSearch] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState("");

  const { data: playlists, isLoading: playlistLoading } = useGetAllPlaylists({
    name: playlistSearch,
  });
  const { data: playlistTrack, isLoading: playlistTrackLoading } =
    useGetOnePlaylist(currentPlaylist);
  const { mutate: updatePlaylist } = useUpdatePlaylist();

  const handleRemoveFromPlaylist = (id: string) => {
    updatePlaylist(
      {
        playlistId: currentPlaylist,
        trackId: id,
        type: "remove",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            ...Object.values(REST_API_PLAYLISTS.GET_ONE),
            currentPlaylist,
          ]);
          notification.open({
            message: "Remove track from playlist successfully!",
            type: "success",
          });
        },
      }
    );
  };

  return (
    <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
      <Title>Playlist</Title>
      <Select
        placeholder="Select a playlist"
        options={playlists?.map((artist) => {
          return { value: artist._id, label: artist.name };
        })}
        loading={playlistLoading}
        showSearch
        onSearch={(value: string) => setPlaylistSearch(value)}
        filterOption={(input, option) =>
          (option?.label ?? "")
            .toString()
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        onChange={(value) => setCurrentPlaylist(value)}
        style={{ width: 300 }}
      />

      <Spin spinning={playlistTrackLoading}>
        <Table
          dataSource={playlistTrack?.trackIds}
          columns={playlistColumns(handleRemoveFromPlaylist)}
          rowKey={"_id"}
        />
      </Spin>
    </Space>
  );
};
