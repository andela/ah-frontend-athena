import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html'
import "./article.scss";
import { MDBInput,MDBContainer, MDBCol, MDBRow } from "mdbreact";

const ArticleCreateForm = ({handleSubmit,handleChange,handleBodyChange,handleTags,state}) => {
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
                onChange={handleChange}
              />
              <ReactQuill
                modules={ArticleCreateForm.modules}
                formats={ArticleCreateForm.formats}
                value={state.body}
                className="border-0" 
                placeholder="Article body"
                name="body"
                onChange={handleBodyChange}
              />
              <MDBInput
                label="Tags"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                className="border-0"
                onChange={handleTags}
              />
              <MDBInput className="border-0" />
            </div>
            <div className="text-center">
              <button type="submit" name="draft" className="btn btn-outline-primary btn-sm" id="publish-btn" onClick={handleSubmit}>Save Draft</button>
            </div>
            <div className="text-center">
              <button type="submit" name="publish" className="btn btn-outline-primary btn-sm" id="publish-btn" onClick={handleSubmit}>Publish</button>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

ArticleCreateForm.modules = {
  toolbar: {
      container:
      [   
          [{ 'font': [] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'script': 'sub' }, { 'script': 'super' }],       // toggled buttons
          ['blockquote', 'code-block'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'color': [] }, { 'background': [] }],  
          ['link', 'image','video'],      
          [{ 'align': [] }],
          ['clean']                                    // remove formatting button
         
      ],
      handlers: {
          "placeholder": function (value) { 
              if (value) {
                  const cursorPosition = this.quill.getSelection().index;
                  this.quill.insertText(cursorPosition, value);
                  this.quill.setSelection(cursorPosition + value.length);
              }
          }
      }
  }
}

ArticleCreateForm.formats = [
  'header','font','size','italic','underline',
  'strike','bold','blockquote','list','link','image','video',
  'code-block','indent','align','color','background','script',
  'script',
]
export default ArticleCreateForm;
