import React from 'react';
import { connect } from 'react-redux';
import { PATHS } from 'src/appConfig/paths';
import { Button, LoadingCommon, Text, View } from 'src/components/common';
import { useLazyPosts } from 'src/queries';
import { showDialog } from 'src/redux/dialog/dialogSlice';
import { IRootState } from 'src/redux/rootReducer';
import { Navigator } from 'src/services';
import './styles.scss';
import LazyCheckPoint from './LazyCheckPoint';

const Dashboard: React.FC<Props> = ({ onShowDialog }) => {
  const { posts, loading, getPosts, fetchNextPage } = useLazyPosts();

  return (
    <View
      className="c-container section-container"
      flexGrow={1}
      style={{ marginTop: 16, marginBottom: 16, paddingTop: 16, position: 'relative' }}
    >
      <View className="sticky-header">
        <View isRowWrap className="mb-16">
          <Button variant="outline" onClick={() => Navigator.navigate(PATHS.query)}>
            Back
          </Button>
          <Button className="fit-width ml-16 mb-16" isLoading={loading} onClick={() => getPosts()}>
            Refetch
          </Button>
        </View>
        <View isRowWrap align="center" className="fw-bold mb-24">
          <Text size={20}>Posts</Text>
          {loading && <LoadingCommon className="ml-16" />}
        </View>
      </View>
      <View className="table-container" style={{ position: 'relative' }}>
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Post ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, idx) => (
              <tr key={`post-id-${post.id}`}>
                <td>
                  {idx % 10 === 9 ? (
                    <LazyCheckPoint onFirstEnter={fetchNextPage}>
                      <span>{post.id}</span>
                    </LazyCheckPoint>
                  ) : (
                    post.id
                  )}
                </td>
                <td>{post.user_id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </View>
    </View>
  );
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = {
  onShowDialog: showDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
