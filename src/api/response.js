const defaultResponse = {
  datatable: {
    draw: 0,
    recordsTotal: 13,
    recordsFiltered: 13,
    data: [],
  },
};

const response = (status, responseJson) => {
  return {
    status: (status === 200 || status === 201) && responseJson.status,
    message:
      typeof responseJson.message === "object" && responseJson.message
        ? responseJson.message[0]
        : responseJson.message,
    data: responseJson.data ?? responseJson.error ?? {},
  };
};

export { response, defaultResponse };
