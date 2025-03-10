import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  startTime: yup.date().max(yup.ref('endTime')).required(),
  endTime: yup.date().min(yup.ref('startTime')).required(),
  img: yup.string().matches(/\.(jpe?g|png|gif|bmp)$/i).required(),
  longitude: yup.string().required(),
  latitude: yup.string().required(),
  placeName: yup.string().required(),
  hashtag: yup.array().of(yup.string()),
})

export default schema
