import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Typography,
  Upload,
  UploadProps,
  message,
  notification,
} from "antd";
import {
  REST_API_ARTISTS,
  useCreateArtist,
  useGetAllArtists,
  useGetAllAlbums,
  useCreateAlbum,
  REST_API_ALBUMS,
  useCreateTrack,
  REST_API_TRACKS,
} from "../../api";
import { useState } from "react";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import { useQueryClient } from "react-query";
import { EDateFormat, EGenre } from "../../constant";
import moment from "moment";

const { Title } = Typography;
const { Dragger } = Upload;

interface IAddTrackModal {
  open: boolean;
  okText: string;
  cancelText: string;
  onOk: () => void;
  onCancel: () => void;
}

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "http://localhost:8000/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export const AddTrackModal = ({
  open,
  okText,
  cancelText,
  onOk,
  onCancel,
}: IAddTrackModal) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const artistId = Form.useWatch("artistId", form);

  const [artistSearch, setArtistSearch] = useState("");
  const [albumSearch, setAlbumSearch] = useState("");
  const [newArtistName, setNewArtistName] = useState("");
  const [newAlbumName, setNewAlbumName] = useState("");

  const { data: artists, isLoading: artistLoading } = useGetAllArtists({
    name: artistSearch,
  });
  const { mutate: createArtist, isLoading: createArtistLoading } =
    useCreateArtist();

  const { data: albums, isLoading: albumLoading } = useGetAllAlbums({
    name: albumSearch,
    artistId,
  });
  const { mutate: createAlbum, isLoading: createAlbumLoading } =
    useCreateAlbum();

  const { mutate: createTrack, isLoading: createTrackLoading } =
    useCreateTrack();

  const handleAddNewArtist = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    createArtist(
      { name: newArtistName },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            ...Object.values(REST_API_ARTISTS.GET_ALL),
          ]);
        },
      }
    );
    setNewArtistName("");
  };

  const handleAddNewAlbum = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    createAlbum(
      { name: newAlbumName, artistId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            ...Object.values(REST_API_ALBUMS.GET_ALL),
          ]);
        },
      }
    );
    setNewAlbumName("");
  };

  const onFinish = (values: any) => {
    createTrack(
      {
        ...values,
        coverImage: values.coverImage.file.response.id,
        audio: values.audio.file.response.id,
        releaseDate: moment(values.releaseDate).format(
          EDateFormat.COMMON_DATE_FORMAT
        ),
      },
      {
        onSuccess: () => {
          onCancel();
          queryClient.invalidateQueries([
            ...Object.values(REST_API_TRACKS.GET_ALL),
          ]);
          form.resetFields();
          notification.open({
            message: "Add track to library successfully!",
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
        loading: createTrackLoading,
      }}
      cancelButtonProps={{
        htmlType: "button",
        disabled: createTrackLoading,
      }}
    >
      <Title level={5}>Add Track</Title>
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
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please input track's title" },
            {
              min: 2,
              max: 500,
              message: `Track's title must be from 2 and 500 characters`,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Artist"
          name="artistId"
          rules={[{ required: true, message: "Please select an artist" }]}
        >
          <Select
            placeholder="Select an artist"
            dropdownRender={(menu) => (
              <Spin spinning={artistLoading}>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Enter artist name"
                    value={newArtistName}
                    onChange={(e) => setNewArtistName(e.target.value)}
                  />
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={handleAddNewArtist}
                    loading={createArtistLoading}
                  >
                    Add an artist
                  </Button>
                </Space>
              </Spin>
            )}
            options={artists?.map((artist) => {
              return { value: artist._id, label: artist.name };
            })}
            loading={artistLoading}
            showSearch
            onSearch={(value: string) => setArtistSearch(value)}
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            onChange={() => form.resetFields(["album"])}
          />
        </Form.Item>

        <Form.Item
          label="Album"
          name="albumId"
          rules={[{ required: true, message: "Please select an album" }]}
        >
          <Select
            placeholder="Select an album"
            dropdownRender={(menu) => (
              <Spin spinning={albumLoading}>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <Input
                    placeholder="Enter album name"
                    value={newAlbumName}
                    onChange={(e) => setNewAlbumName(e.target.value)}
                  />
                  <Button
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={handleAddNewAlbum}
                    loading={createAlbumLoading}
                  >
                    Add an album
                  </Button>
                </Space>
              </Spin>
            )}
            options={albums?.map((album) => {
              return { value: album._id, label: album.name };
            })}
            loading={albumLoading}
            showSearch
            onSearch={(value: string) => setAlbumSearch(value)}
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item
          label="Genre"
          name="genre"
          rules={[{ required: true, message: "Please select genre" }]}
        >
          <Select
            placeholder="Select genre"
            options={Object.keys(EGenre).map((genre) => {
              return {
                value: genre,
                label:
                  genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase(),
              };
            })}
          />
        </Form.Item>

        <Form.Item
          label="Release Date"
          name="releaseDate"
          rules={[{ required: true, message: "Please select release date" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="Duration"
          name="duration"
          rules={[{ required: true, message: "Please enter track's duration" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Cover image"
          name={"coverImage"}
          style={{ display: "flex", flexDirection: "column" }}
          rules={[{ required: true, message: "Please upload cover image" }]}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag cover image file to this area to upload
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item
          label="Audio"
          name={"audio"}
          style={{ display: "flex", flexDirection: "column" }}
          rules={[{ required: true, message: "Please upload mp3 file" }]}
        >
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag mp3 file to this area to upload
            </p>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
};
