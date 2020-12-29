const formatDate = (inDate) => {
  const objectDate = new Date(inDate)
  return objectDate.toLocaleDateString();
};

export default formatDate;