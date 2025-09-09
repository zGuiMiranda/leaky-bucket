import logger from "./Winston";

function getCallerInfo(): { className: string; methodName: string } {
  const err = new Error();
  const stack = err.stack?.split("\n") || [];
  for (let i = 3; i < stack.length; i++) {
    const line = stack[i].trim();

    let match = line.match(/at ([\w\d_$]+)\.([\w\d_$]+) /);
    if (match) {
      return { className: match[1], methodName: match[2] };
    }

    match = line.match(/at ([\w\d_$]+) /);
    if (match) {
      return { className: "Global", methodName: match[1] };
    }

    match = line.match(/at (.*):(\d+):(\d+)/);
    if (match) {
      return { className: "Anonymous", methodName: `line ${match[2]}` };
    }
  }

  return { className: "Unknown", methodName: "Unknown" };
}

export const autoLogger = {
  info(message: string, meta?: Record<string, any>) {
    const { className, methodName } = getCallerInfo();
    logger.info(message, { className, methodName, ...meta });
  },

  warn(message: string, meta?: Record<string, any>) {
    const { className, methodName } = getCallerInfo();
    logger.warn(message, { className, methodName, ...meta });
  },

  error(error: any, meta?: Record<string, any>) {
    const { className, methodName } = getCallerInfo();
    logger.error(error, { className, methodName, ...meta });
  },
};
