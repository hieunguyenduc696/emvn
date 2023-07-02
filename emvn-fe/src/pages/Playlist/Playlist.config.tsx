import { ColumnsType } from "antd/es/table";
import { ITrack } from "../../types";
import { Space, Tooltip, Typography } from "antd";
import { formatDate } from "../../helpers";
import { DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

export const playlistColumns = (
  handleRemoveFromPlaylist: (id: string) => void
): ColumnsType<ITrack> => [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (record) => <Text>{record}</Text>,
  },
  {
    title: "Artist",
    dataIndex: "artistId",
    key: "artist",
    render: (record) => <Text>{record.name}</Text>,
  },
  {
    title: "Album",
    dataIndex: "albumId",
    key: "album",
    render: (record) => <Text>{record.name}</Text>,
  },
  {
    title: "Genre",
    key: "genre",
    dataIndex: "genre",
    render: (record) => <Text>{record}</Text>,
  },
  {
    title: "Release Date",
    key: "releaseDate",
    dataIndex: "releaseDate",
    render: (record) => <Text>{formatDate(record)}</Text>,
  },
  {
    title: "Duration",
    key: "duration",
    dataIndex: "duration",
    align: "center",
    render: (record) => <Text>{record}</Text>,
  },
  {
    title: "Action",
    key: "action",
    align: "center",
    render: (record) => (
      <Space direction="horizontal" size={"middle"}>
        <Tooltip title="Remove from playlist">
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => handleRemoveFromPlaylist(record._id)}
          />
        </Tooltip>
      </Space>
    ),
  },
];
