enum EResponseCode {
  SUCCESS = '200',
}

enum EResponseMessage {
  SUCCESS = 'SUCCESS',
}

export const isLoadingByStatusCode = (code) => {
  if (code === EResponseCode.SUCCESS) {
    return false;
  }
};
