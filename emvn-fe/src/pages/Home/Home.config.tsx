import { ColumnsType } from "antd/es/table";
import { Badge, Input, MenuProps, Space, Tooltip, Typography } from "antd";
import { ITrack, TGetTrackParams } from "../../types";
import {
  BulbOutlined,
  UserOutlined,
  AppstoreOutlined,
  CloseCircleOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import { formatDate } from "../../helpers";
import { debounce } from "lodash";

const { Text } = Typography;

export const columns = (
  handleChangeCurrentTrack: (track: ITrack) => void,
  handleOpenUpdateTrackModal: (id: string) => void,
  handleDeleteTrack: (id: string) => void,
  handleOpenAddToPlaylistModal: (id: string) => void
): ColumnsType<ITrack> => [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (record) => <Text>{record}</Text>,
  },
  {
    title: "Artist",
    dataIndex: "artistDetail",
    key: "artist",
    render: (record) => <Text>{record.name}</Text>,
  },
  {
    title: "Album",
    dataIndex: "albumDetail",
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
        <PlayCircleOutlined onClick={() => handleChangeCurrentTrack(record)} />
        <EditOutlined onClick={() => handleOpenUpdateTrackModal(record._id)} />
        <EyeOutlined style={{ color: "#1777ff" }} />
        <Tooltip title="Add to playlist">
          <PlusCircleOutlined
            onClick={() => handleOpenAddToPlaylistModal(record._id)}
          />
        </Tooltip>
        <DeleteOutlined
          style={{ color: "red" }}
          onClick={() => handleDeleteTrack(record._id)}
        />
      </Space>
    ),
  },
];

export type TFilterState = "title" | "artist" | "album" | "genre";

export const defaultFilterState: { [key in TFilterState]: boolean } = {
  title: false,
  artist: false,
  album: false,
  genre: false,
};

export const items = (
  handleOpenFilterState: (key: TFilterState) => void
): MenuProps["items"] => {
  return [
    {
      key: "title",
      label: "Title",
      icon: <BulbOutlined />,
      onClick: () => handleOpenFilterState("title"),
    },
    {
      key: "artist",
      label: "Artist",
      icon: <UserOutlined />,
      onClick: () => handleOpenFilterState("artist"),
    },
    {
      key: "album",
      label: "Album",
      icon: <AppstoreOutlined />,
      onClick: () => handleOpenFilterState("album"),
    },
  ];
};

interface IFilterRender {
  key: TFilterState;
  render: ReactNode;
}

export const filterRender = (
  handleCloseFilterState: (key: TFilterState) => void,
  handleFilterChange: (type: keyof TGetTrackParams, newValue: any) => void
): IFilterRender[] => [
  {
    key: "title",
    render: (
      <Badge
        count={
          <CloseCircleOutlined
            style={{
              color: "#94242B",
              background: "#FFEBEC",
              borderRadius: "100%",
              zIndex: 999,
            }}
            onClick={() => handleCloseFilterState("title")}
          />
        }
      >
        <Input
          placeholder="Enter title"
          prefix={<BulbOutlined />}
          allowClear
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            debounce(
              () => handleFilterChange("title", event.target.value),
              500
            )()
          }
        />
      </Badge>
    ),
  },
  {
    key: "artist",
    render: (
      <Badge
        count={
          <CloseCircleOutlined
            style={{
              color: "#94242B",
              background: "#FFEBEC",
              borderRadius: "100%",
              zIndex: 999,
            }}
            onClick={() => handleCloseFilterState("artist")}
          />
        }
      >
        <Input
          placeholder="Enter artist name"
          prefix={<UserOutlined />}
          allowClear
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            debounce(
              () => handleFilterChange("artistName", event.target.value),
              500
            )()
          }
        />
      </Badge>
    ),
  },
  {
    key: "album",
    render: (
      <Badge
        count={
          <CloseCircleOutlined
            style={{
              color: "#94242B",
              background: "#FFEBEC",
              borderRadius: "100%",
              zIndex: 999,
            }}
            onClick={() => handleCloseFilterState("album")}
          />
        }
      >
        <Input
          placeholder="Enter album name"
          prefix={<AppstoreOutlined />}
          allowClear
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            debounce(
              () => handleFilterChange("albumName", event.target.value),
              500
            )()
          }
        />
      </Badge>
    ),
  },
];
