import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Typography,
  notification,
} from "antd";
import {
  REST_API_PLAYLISTS,
  useCreatePlaylist,
  useGetAllPlaylists,
  useUpdatePlaylist,
} from "../../api";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useQueryClient } from "react-query";

const { Title } = Typography;

interface IAddTrackModal {
  trackId: string;
  open: boolean;
  okText: string;
  cancelText: string;
  onOk: () => void;
  onCancel: () => void;
}

export const AddToPlaylistModal = ({
  trackId,
  open,
  okText,
  cancelText,
  onOk,
  onCancel,
}: IAddTrackModal) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const [playlistSearch, setPlaylistSearch] = useState("");
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const { data: playlists, isLoading: playlistLoading } = useGetAllPlaylists({
    name: playlistSearch,
  });
  const { mutate: createPlaylist, isLoading: createPlaylistLoading } =
    useCreatePlaylist();
  const { mutate: updatePlaylist, isLoading: updatePlaylistLoading } =
    useUpdatePlaylist();

  const handleAddNewArtist = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    createPlaylist(
      { name: newPlaylistName },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            ...Object.values(REST_API_PLAYLISTS.GET_ALL),
          ]);
        },
      }
    );
    setNewPlaylistName("");
  };

  const onFinish = (values: any) => {
    updatePlaylist(
      {
        playlistId: values.playlistId,
        trackId,
        type: "add",
      },
      {
        onSuccess: () => {
          onCancel();
          form.resetFields();
          notification.open({
            message: "Add track to playlist successfully!",
            type: "success",
          });
        },
      }
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      okButtonProps={{
        htmlType: "submit",
        onClick: () => {
          form.submit();
        },
        loading: updatePlaylistLoading,
      }}
      cancelButtonProps={{
        htmlType: "button",
        disabled: updatePlaylistLoading,
      }}
    >
      <Title level={5}>Add Track To Playlist</Title>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item
          label="Playlist"
          name="playlistId"
          rules={[{ required: true, message: "Please select a playlist" }]}
        >
          <Select
            placeholder="Select a playlist"
            dropdownRender={(menu) => (
              <Spin spinning={playlistLoading}>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Enter playlist name"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                  />
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={handleAddNewArtist}
                    loading={createPlaylistLoading}
                  >
                    Add a playlist
                  </Button>
                </Space>
              </Spin>
            )}
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
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
