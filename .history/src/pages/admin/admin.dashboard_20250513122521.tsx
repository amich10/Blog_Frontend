import { ArrowUpOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Col, Layout, Row, Statistic,Typography } from "antd";
const { Title, Text } = Typography;

const AdminDashBoard = () =>{
    return (
        <>
       <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {/* Stats Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Posts"
                  value={1248}
                  prefix={<EditOutlined />}
                  suffix={
                    <Text type="success" style={{ fontSize: '14px' }}>
                      <ArrowUpOutlined /> 12.5%
                    </Text>
                  }
                />
                <Text type="secondary" style={{ fontSize: '12px' }}>from last month</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Views"
                  value={84593}
                  prefix={<Eye />}
                  suffix={
                    <Text type="success" style={{ fontSize: '14px' }}>
                      <ArrowUpOutlined /> 8.3%
                    </Text>
                  }
                />
                <Text type="secondary" style={{ fontSize: '12px' }}>from last month</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Comments"
                  value={1024}
                  prefix={<CommentOutlined />}
                  suffix={
                    <Text type="success" style={{ fontSize: '14px' }}>
                      <ArrowUpOutlined /> 5.7%
                    </Text>
                  }
                />
                <Text type="secondary" style={{ fontSize: '12px' }}>from last month</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Subscribers"
                  value={3287}
                  prefix={<UserOutlined />}
                  suffix={
                    <Text type="success" style={{ fontSize: '14px' }}>
                      <ArrowUpOutlined /> 4.2%
                    </Text>
                  }
                />
                <Text type="secondary" style={{ fontSize: '12px' }}>from last month</Text>
              </Card>
            </Col>
          </Row>

          {/* Recent Posts and Quick Actions */}
          <Row gutter={[16, 16]}>
            {/* Recent Posts */}
            <Col xs={24} lg={16}>
              <Card
                title="Recent Posts"
                extra={<a href="#">View all posts</a>}
              >
                <List
                  itemLayout="vertical"
                  dataSource={[
                    {
                      title: 'How to Build a Blog with Next.js',
                      date: 'May 12, 2023',
                      views: '1,245 views',
                      comments: '24 comments'
                    },
                    {
                      title: 'Tailwind CSS Tips and Tricks',
                      date: 'May 10, 2023',
                      views: '2,187 views',
                      comments: '42 comments'
                    },
                    {
                      title: 'React Hooks Explained',
                      date: 'May 8, 2023',
                      views: '3,542 views',
                      comments: '56 comments'
                    }
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      extra={[
                        <Button key="edit" type="text" icon={<EditOutlined />} />,
                        <Button key="delete" type="text" icon={<MoreOutlined />} />
                      ]}
                    >
                      <List.Item.Meta
                        title={<a href="#">{item.title}</a>}
                        description={`Published on ${item.date}`}
                      />
                      <div>
                        <Text type="secondary" style={{ marginRight: '16px' }}>{item.views}</Text>
                        <Text type="secondary">{item.comments}</Text>
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            {/* Quick Actions and Recent Comments */}
            <Col xs={24} lg={8}>
              <Card title="Quick Actions" style={{ marginBottom: '16px' }}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Button type="dashed" block icon={<PlusOutlined />} style={{ height: '80px' }}>
                      New Post
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button type="dashed" block icon={<TagsOutlined />} style={{ height: '80px' }}>
                      Add Category
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button type="dashed" block icon={<FileImageOutlined />} style={{ height: '80px' }}>
                      Media Library
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button type="dashed" block icon={<UserAddOutlined />} style={{ height: '80px' }}>
                      Add User
                    </Button>
                  </Col>
                </Row>
              </Card>

              <Card
                title="Recent Comments"
                extra={<a href="#">View all comments</a>}
              >
                <List
                  dataSource={[
                    {
                      name: 'John Doe',
                      comment: 'Great article! Very helpful tips.',
                      post: 'On "Tailwind CSS Tips and Tricks"'
                    },
                    {
                      name: 'Jane Smith',
                      comment: 'Could you expand on the hooks section?',
                      post: 'On "React Hooks Explained"'
                    }
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="https://via.placeholder.com/150" />}
                        title={item.name}
                        description={
                          <>
                            <div>{item.comment}</div>
                            <Text type="secondary" style={{ fontSize: '12px' }}>{item.post}</Text>
                          </>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Layout.Content>
        </>
    )
}

export default AdminDashBoard;