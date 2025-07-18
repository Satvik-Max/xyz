"use client";
import dynamic from "next/dynamic";
import React from "react";
import "suneditor/dist/css/suneditor.min.css";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const TextEditor = ({ setartical, artical, height, width }) => {
  return (
    <div className="mt-2">
      <SunEditor
        defaultValue={artical}
        placeholder="Write Something"
        onChange={(content) => {
          setartical(content);
        }}
        height={height}
        width={width}
        setOptions={{
          mode: "classic",

          rtl: false,

          katex: "window.katex",

          imageGalleryUrl:
            "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",

          videoFileInput: false,

          tabDisable: false,
          buttonList: [
            [
              "undo",

              "redo",

              "font",

              "fontSize",

              "formatBlock",

              "paragraphStyle",

              "blockquote",

              "bold",

              "underline",

              "italic",

              "strike",

              "subscript",

              "superscript",

              "fontColor",

              "hiliteColor",

              "textStyle",

              "removeFormat",

              "outdent",

              "indent",

              "align",

              "horizontalRule",

              "list",

              "lineHeight",

              "table",

              "link",

              "image",

              "video",

              "imageGallery",

              "fullScreen",

              "codeView",

              "preview",
            ],
          ],

          "lang(In nodejs)": "en",
        }}
      />
    </div>
  );
};

export default TextEditor;
