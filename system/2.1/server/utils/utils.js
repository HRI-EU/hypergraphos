exports.recomputeURL = function (url, virtualPath, realPath) {
    if (!virtualPath.endsWith('/')) {
        virtualPath = virtualPath + '/';
    }
    if (!url.startsWith('/')) {
        url = '/' + url;
    }
    if (url.startsWith(virtualPath)) {
        const startIdx = virtualPath.length;
        // Remove '/fileServer/' virtual path
        const urlFilePath = url.substring(startIdx);
        // Create file path name
        const filePathName = realPath + '/' + urlFilePath;
        return (filePathName);
    } else {
        return (url);
    }
}
exports.getPathInfo = function (path) {
    const pathName = path.substring(0, path.lastIndexOf('/'));
    const fileNameExt = path.substring(path.lastIndexOf('/') + 1);
    let dotIdx = fileNameExt.lastIndexOf('.');
    dotIdx = (dotIdx == -1 ? fileNameExt.length : dotIdx);
    const fileName = fileNameExt.substring(0, dotIdx);
    const extension = fileNameExt.substring(dotIdx + 1);
    return ({ pathName, fileName, extension });
}

