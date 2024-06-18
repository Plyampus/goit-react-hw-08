export const handleKeyPress = (event) => {
  const charCode = event.charCode;
  if ((charCode < 48 || charCode > 57) && charCode !== 45) {
    event.preventDefault();
  }
};
