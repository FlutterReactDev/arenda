export const calcLineEvent = (
  time_begin: number,
  time_end: number,
  left: number,
  right: number
) => {
  // ширина поля
  const diff = right - left;
  // Расчет отступа от левой части
  let offset = (1 - (left - time_begin)) / diff;
  // Расчет ширины
  let width = (time_end - time_begin) / diff;
  // если период меньше чем сутки принудительно установим ширину 1 суток
  //   if (time_end - time_begin <= oneDayInMilisec) {
  //     width = oneDayInMilisec / diff;
  //   }

  // Фиксим максимыльный размер элемента дабы небыло БЛОКОВ в DOM с шириной в 28000px
  if (offset < -0.4) {
    width = width + (offset + 0.4);
    offset = -0.4;
  } else {
    offset -= 0.004;
    width += 0.004;
  }
  width = Math.min(width, 1.8);
  return { offset, width };
};
