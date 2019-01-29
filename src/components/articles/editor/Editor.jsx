import React from "react";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";
import { MDBInput, MDBContainer, MDBCol, MDBRow } from "mdbreact";
import TagInput from "../../Tags/TagsInput/TagInput";

export const Editor = ({
  handleSubmit,
  handleChange,
  handleBodyChange,
  handleTags,
  state
}) => {
  return (
    <MDBContainer className=" mt-5 pt-5">
      <MDBRow>
        <MDBCol md="12">
          <form>
            <div className="grey-text">
              <MDBInput
                label="Title"
                icon=""
                group
                type="text"
                validate
                error="wrong"
                success="right"
                className="border-0"
                name="title"
                value={state.title}
                onChange={handleChange}
              />
              <MDBInput
                label="Description"
                icon=""
                group
                type="text"
                validate
                error="wrong"
                success="right"
                className="border-0"
                name="description"
                value={state.description}
                onChange={handleChange}
              />
              <ReactQuill
                modules={Editor.modules}
                formats={Editor.formats}
                value={state.body}
                className="border-0"
                placeholder="Article body"
                name="body"
                onChange={handleBodyChange}
              />
              <TagInput
                label="Tags"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                className="border-0"
                handleTags={handleTags}
                tagList={state.tagList}
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                name="draft"
                className="btn btn-primary btn-sm"
                id="publish-btn"
                onClick={handleSubmit}
              >
                Save Draft
              </button>
            </div>
            <div className="text-center">
              <button
                type="submit"
                name="publish"
                className="btn btn-primary btn-sm"
                id="publish-btn"
                onClick={handleSubmit}
              >
                Publish
              </button>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

Editor.modules = {
  toolbar: {
    container: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      [{ align: [] }],
      ["clean"]
    ]
  }
};

Editor.formats = [
  "header",
  "font",
  "size",
  "italic",
  "underline",
  "strike",
  "bold",
  "blockquote",
  "list",
  "link",
  "image",
  "video",
  "code-block",
  "indent",
  "align",
  "color",
  "background",
  "script",
  "script"
];

Editor.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  handleBodyChange: PropTypes.func,
  handleTags: PropTypes.func,
  state: PropTypes.shape({})
};

Editor.defaultProps = {
  handleSubmit: () => {},
  handleChange: () => {},
  handleBodyChange: () => {},
  handleTags: () => {},
  state: {}
};
export default Editor;
