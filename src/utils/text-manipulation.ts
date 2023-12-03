import dayjs from "dayjs";
import 'dayjs/locale/id'

export const convertDate = (date: Date | undefined, format: string= 'HH:mm, DD MMMM YYYY') =>{
    if (!date) return

    const formattedDate = dayjs(date).locale('id').format(format);
    return formattedDate
}