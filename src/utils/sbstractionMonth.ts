export function subtractionMonth(numMonth: number) {
    const now = new Date();
    const month =
      now.getMonth() - numMonth < 0
        ? 11 + now.getMonth() - numMonth
        : now.getMonth() - numMonth;
    const year =
      now.getMonth() - numMonth < 0 ? now.getFullYear() - 1 : now.getFullYear();
    const date = new Date(`${year}-${month}-1`);
    return `${year}-${month}-1 11:59:59.999999999`;
  }