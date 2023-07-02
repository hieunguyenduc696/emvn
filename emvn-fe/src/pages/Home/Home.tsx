import {
  Button,
  Col,
  Dropdown,
  Row,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
import { FilterOutlined } from "@ant-design/icons";
import {
  TFilterState,
  columns,
  defaultFilterState,
  filterRender,
  items,
} from "./Home.config";
import { Fragment, useState } from "react";
import { REST_API_TRACKS, useDeleteTrack, useGetAllTracks } from "../../api";
import { ITrack, TGetTrackParams } from "../../types";
import { AddTrackModal } from "./AddTrackModal";
import { useQueryClient } from "react-query";
import { UpdateTrackModal } from "./UpdateTrackModal";
import { cloneDeep } from "lodash";
import { useTrackContext } from "../../context";
import { AddToPlaylistModal } from "./AddToPlaylistModal";
const { Title } = Typography;

const openModalState = {
  add: false,
  update: false,
  addToPlaylist: false,
};

export const Home = () => {
  const queryClient = useQueryClient();
  const { handleChangeTrack } = useTrackContext();

  const [filterState, setFilterState] = useState(defaultFilterState);
  const [filters, setFilters] = useState<TGetTrackParams>({});
  const [openModal, setOpenModal] = useState(openModalState);
  const [currentTrackId, setCurrentTrackId] = useState<string>();

  const { data: tracks, isLoading: trackLoading } = useGetAllTracks(filters);
  const { mutate: deleteTrack } = useDeleteTrack();

  const handleOpenFilterState = (type: TFilterState) => {
    setFilterState((prev) => {
      return { ...prev, [type]: true };
    });
  };

  const handleCloseFilterState = (type: TFilterState) => {
    setFilterState((prev) => {
      return { ...prev, [type]: false };
    });
  };

  const handleFilterChange = (type: keyof TGetTrackParams, newValue: any) => {
    setFilters((prev) => {
      return { ...prev, [type]: newValue };
    });
  };

  const handleOpenModalChange = (
    type: keyof typeof openModalState,
    value: boolean
  ) => {
    setOpenModal((prev) => {
      return { ...prev, [type]: value };
    });
  };

  const handleOpenUpdateTrackModal = (id: string) => {
    handleOpenModalChange("update", true);
    setCurrentTrackId(id);
  };
  const handleCloseUpdateTrackModal = () => {
    handleOpenModalChange("update", false);
    setCurrentTrackId("");
  };
  const handleOpenAddToPlaylistModal = (id: string) => {
    handleOpenModalChange("addToPlaylist", true);
    setCurrentTrackId(id);
  };
  const handleCloseAddToPlaylistModal = () => {
    handleOpenModalChange("addToPlaylist", false);
    setCurrentTrackId("");
  };

  const handleDeleteTrack = (id: string) => {
    deleteTrack(id, {
      onSuccess: () => {
        queryClient.invalidateQueries([
          ...Object.values(REST_API_TRACKS.GET_ALL),
        ]);
      },
    });
  };

  const handleChangeCurrentTrack = (track: ITrack) => {
    handleChangeTrack(track);
  };

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Row>
          <Col span={12}>
            <Title level={4}>Track Management</Title>
          </Col>
          <Col
            span={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              type="primary"
              onClick={() => handleOpenModalChange("add", true)}
            >
              Add Track
            </Button>
          </Col>
        </Row>

        <Space direction="horizontal" size={"middle"}>
          <Dropdown
            menu={{ items: items(handleOpenFilterState) }}
            trigger={["click"]}
          >
            <Button type="primary" icon={<FilterOutlined />}>
              Filter
            </Button>
          </Dropdown>
          {filterRender(handleCloseFilterState, handleFilterChange).map(
            (item) => (
              <Fragment key={item.key}>
                {filterState[item?.key] && item.render}
              </Fragment>
            )
          )}
        </Space>
        <Spin spinning={trackLoading}>
          <Table
            dataSource={cloneDeep(tracks)}
            columns={columns(
              handleChangeCurrentTrack,
              handleOpenUpdateTrackModal,
              handleDeleteTrack,
              handleOpenAddToPlaylistModal
            )}
            rowKey="_id"
          />
        </Spin>
      </Space>

      <AddTrackModal
        open={openModal.add}
        okText="Create"
        cancelText="Cancel"
        onOk={() => {}}
        onCancel={() => handleOpenModalChange("add", false)}
      />
      {!!currentTrackId && (
        <UpdateTrackModal
          trackId={currentTrackId}
          open={openModal.update}
          okText="Update"
          cancelText="Cancel"
          onOk={() => {}}
          onCancel={handleCloseUpdateTrackModal}
        />
      )}

      {!!currentTrackId && (
        <AddToPlaylistModal
          trackId={currentTrackId}
          open={openModal.addToPlaylist}
          okText="Add to playlist"
          cancelText="Cancel"
          onOk={() => {}}
          onCancel={handleCloseAddToPlaylistModal}
        />
      )}
    </div>
  );
};
