import { Editor } from "@tinymce/tinymce-react";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import "../css/CreateBlog.css";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Please write something"),
  thumbnail: Yup.mixed().required("Select a file"),
});

export default function CreateBlog() {
  const accessToken = localStorage.getItem("access_token");
  const tinymceKey = process.env.REACT_APP_TINYMCE_API_KEY;

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      thumbnail: "",
    },
    validationSchema,
    onSubmit: (values) => {
      axios
        .post(
          "/blogs/create/",
          {
            title: formik.values.title,
            content: formik.values.content,
            thumbnail: formik.values.thumbnail,
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(accessToken)}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toast.success("Blog created successfully");
          formik.resetForm();
        })
        .catch(() => {
          toast.error("Failed to create blog");
        });
    },
  });
  const handlefileChange = (e) => {
    formik.setFieldValue("thumbnail", e.target.files[0]);
  };
  return (
    <div className="container min-h-screen create-blog">
      <h1 className="text-2xl font-bold mb-10">Create Blog</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Title
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="title"
              type="text"
              placeholder="Title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title ? (
              <p className="sm text-red-400 italic">{formik.errors.title}</p>
            ) : null}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="thumbnail"
            >
              Select thumbnail
            </label>
            <input
              type="file"
              onChange={handlefileChange}
              placeholder="thumnail"
              className="tags-field"
              name="thumbnail"
            />
            {formik.touched.thumbnail && formik.errors.thumbnail ? (
              <p className="sm text-red-400">{formik.errors.thumbnail}</p>
            ) : null}
          </div>
        </div>
        <Editor
          apiKey={tinymceKey}
          init={{
            plugins: "link code codesample",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image| spellcheckdialog typography | align lineheight | checklist numlist bullist indent outdent | link| code",
          }}
          initialValue="What do you have for the world today?"
          value={formik.values.content}
          onEditorChange={(newContent) => {
            formik.setFieldValue("content", newContent);
          }}
        />
        {formik.touched.content && formik.errors.content ? (
          <p className="sm text-red-400">{formik.errors.content}</p>
        ) : null}

        <button
          type="submit"
          className="bg-blue-600
                hover:bg-blue-400
                text-white py-2 px-4
                rounded my-6"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Posting ..." : "Post"}
        </button>
      </form>
    </div>
  );
}
