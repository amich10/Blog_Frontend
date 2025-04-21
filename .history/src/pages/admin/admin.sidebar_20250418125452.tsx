<Sider
  trigger={null}
  collapsible
  collapsed={collapsed}
  collapsedWidth={0}
  className="admin-sidebar"
  width={240}
  style={{
    background: "#1a202c", // dark background
    minHeight: "100vh",
    boxShadow: "2px 0 8px #2d3748", // subtle shadow
    color: "#fff",
  }}
>
  <div className="flex flex-col items-center py-6 border-b border-gray-800 bg-[#1a202c]">
    <img
      src={userDetails?.image?.optimizedUrl || "https://placehold.co/60x60"}
      alt={userDetails?.name || "User Avatar"}
      className="rounded-full w-16 h-16 border-2 border-blue-400 shadow"
    />
    <p className="mt-3 text-base font-semibold text-gray-100">
      {userDetails?.name || "Guest"}
    </p>
    {userDetails?.email && (
      <span className="text-xs text-gray-400">{userDetails.email}</span>
    )}
  </div>
  <Menu
    theme="dark"
    mode="inline"
    defaultSelectedKeys={["1"]}
    className="admin-menu"
    items={[
      {
        key: "1",
        icon: <HomeOutlined style={{ color: "#60a5fa" }} />, // blue accent
        label: <NavLink to="/admin" style={{ color: "#fff" }}>Dashboard</NavLink>,
      },
      {
        key: "2",
        icon: <UserOutlined style={{ color: "#60a5fa" }} />,
        label: <NavLink to="/admin/users" style={{ color: "#fff" }}>Users</NavLink>,
      },
      {
        key: "3",
        icon: <ApartmentOutlined style={{ color: "#60a5fa" }} />,
        label: <NavLink to="/admin/category" style={{ color: "#fff" }}>Category</NavLink>,
      },
      {
        key: "4",
        icon: <FileTextOutlined style={{ color: "#60a5fa" }} />,
        label: <NavLink to="/admin/products" style={{ color: "#fff" }}>Posts</NavLink>,
      },
    ]}
  />
</Sider>
