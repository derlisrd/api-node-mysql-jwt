export const dateFormatNowYMDHMS = (date = new Date())=>{

    let fecha =
        date.getFullYear().toString() +
          "-" +
          (date.getMonth() + 1).toString().padStart(2, 0) +
          "-" + date.getDate().toString().padStart(2, 0);
          let hora =
          date.getHours().toString().padStart(2, 0) +
          ":" +
          date.getMinutes().toString().padStart(2, 0) +
          ":" +
          date.getSeconds().toString().padStart(2, 0);
    return `${fecha} ${hora}`; // retorna 2021-12-30 12:02:03
}