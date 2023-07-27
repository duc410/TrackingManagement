export const ProtectedRoute = ({ path, allowedRoutes = [], children }) => {
  if (!allowedRoutes.includes(path)) {
    return <h1 style={{"color":"red"}}>{`Không có quyền truy cập ${path}`}</h1>;
  }
  return children;
};
