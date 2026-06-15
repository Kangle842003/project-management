tinymce.init({
  selector: 'textarea.timymce',
  plugins: 'lists link image table code help wordcount',
  license_key: 'gpl',
  toolbar:'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | image link | code',
  file_picker_types: 'image',
  file_picker_callback: function (cb, value, meta) {

    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = function () {

      const file = this.files[0];

      const reader = new FileReader();

      reader.onload = function () {

        const id = 'blobid' + (new Date()).getTime();

        const blobCache =
          tinymce.activeEditor.editorUpload.blobCache;

        const base64 = reader.result.split(',')[1];

        const blobInfo = blobCache.create(
          id,
          file,
          base64
        );

        blobCache.add(blobInfo);

        cb(blobInfo.blobUri(), {
          title: file.name
        });
      };

      reader.readAsDataURL(file);
    };

    input.click();
  }
});