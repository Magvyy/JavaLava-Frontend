import { useState } from "react";
import { useParams } from "react-router-dom";
import type { PostResponse } from "@/types/ApiResponses";
import { useScrollToEnd } from "@/pages/feeds/hooks/useScrollToEnd";
import { useUserPosts } from "./hooks/useUserPosts";
import { useProfileUser } from "./hooks/useProfileUser";
import Feed from "@/features/feed/components/Feed";
import { User } from "@/features/users";
import { FriendActions } from "@/features/users/components/FriendActions";
import "./UserPage.css";
import { useAuthenticateMe } from "@/shared/hooks/useAuthenticateMe";
import { CreatePost } from "@/features/posts";

export function UserPage() {
	const { userId } = useParams();
	const profileId = Number(userId);
	
	const { user } = useAuthenticateMe();
	const authUserId = (user) ? user.id : null

	const isSelf = authUserId != null && authUserId === profileId;
	const [update, setUpdate] = useState<boolean>(true);
	const { posts, setPosts, state, resetPosts } = useUserPosts(profileId, update);
	const { profileUser, setProfileUser, profileLoading, profileError: error } = useProfileUser(profileId);

	useScrollToEnd(() => {
		if (update) setUpdate(false)
		else setUpdate(true);
	});

	const onCreate = (post: PostResponse) => {
        setPosts([post, ...posts]);
    }

	const onEdit = (edit: PostResponse) => {
		const temp = posts.map(post => {
			if (post.id === edit.id) {
				return edit;
			} else {
				return post;
			}
		});
		setPosts(temp);
	};

	const onDelete = (del: PostResponse | number) => {
		const temp = posts.filter(post => {
			if (typeof del === "number" && post.id !== del) {
				return post;
			} else if (post.id !== (del as PostResponse).id) {
				return post;
			}
		})
		setPosts(temp);
	};

    const onClickPost = (post: PostResponse) => {
        window.location.href = "/post/" + post.id;
    }


	const showEmptyState = !state.loading && posts.length === 0 && profileUser != null;
	const showLoadingState = state.loading && posts.length === 0;

	const profileHeader = (
	<div className="profile-header">
		{profileUser && <User user={profileUser} />}

		{profileUser && (
			<FriendActions
				profileUser={profileUser}
				isSelf={isSelf}
				onFriendStatusChange={(status) =>
					setProfileUser({ ...profileUser, friend_status: status })
				}
				onVisibilityChange={() => {
					resetPosts();
					setUpdate(prev => !prev);
				}}
			/>
		)}
	</div>
	);

	const profileState = (
        <div className="profile-state">
            {profileLoading && <p>Loading profile...</p>}
            {!profileLoading && error === "not-found" && <p>User does not exist.</p>}
            {!profileLoading && !error && showLoadingState && <p>Loading posts...</p>}
            {showEmptyState && <p>@{profileUser?.user_name} hasn’t posted yet.</p>}
        </div>
    );

	const profileFeed = (
		<>
			{profileHeader}
			{profileState}
			{isSelf &&  <CreatePost onCreate={onCreate}/>}
			<Feed
				onEdit={onEdit}
				onDelete={onDelete}
				onClick={onClickPost}
				posts={posts}
			/>
		</>
	);

	return (
    <>
        <div className="profile-page">
			{profileFeed}
        </div>
    </>
    );

}
