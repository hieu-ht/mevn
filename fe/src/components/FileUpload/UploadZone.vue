<script lang="jsx">
import {uploadFile} from './fs-util';
import {openUploadFileDialog} from '@/utils/file';
import {FILE_API_URL} from '@/constants';
import {inject} from 'vue';

export default {
  emits: ['uploaded'],
  props: {
    multiple: Boolean,
    mimeType: {
      type: String,
      default: '*/*'
    }
  },
  setup(props, {emit, slots}) {
    const {notification} = inject('TSystem')
    const addNewFile = async () => {
      openUploadFileDialog({multiple: props.multiple, mimeType: props.mimeType}, async (files) => {
        if (!files.length)
          return;
        try {
          if (props.multiple) {
            const uploadedFiles = (await Promise.all(uploadFile(files)))
            emit('uploaded', uploadedFiles.map((uploadedFile, i) => {
              return {
                name: files[i].name,
                src: `${FILE_API_URL}/${uploadedFile.filename}`,
                size: uploadedFile.chunkSize,
                type: uploadedFile.contentType,
                thumbnail: `${FILE_API_URL}/${uploadedFile.metadata.thumbnail}`,
                createdAt: new Date()
              }
            }))
          } else {
            const file = files[0]
            const uploadedFile = (await Promise.all(uploadFile([file])))[0]
            emit('uploaded', {
              name: file.name,
              src: `${FILE_API_URL}/${uploadedFile.filename}`,
              size: uploadedFile.chunkSize,
              type: uploadedFile.contentType,
              thumbnail: `${FILE_API_URL}/${uploadedFile.metadata.thumbnail}`,
              createdAt: new Date()
            })
          }
          notification.success('[upload-zone] Upload completed');
        } catch (e) {
          console.error(e, '[addNewFile]')
          notification.err(e.message);
        }
      })
    }

    return () => <div class="clickable" onClick={addNewFile}>{slots.default ? slots.default() : 'Upload'}</div>
  }
}
</script>
