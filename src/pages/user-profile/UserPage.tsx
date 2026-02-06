import { useState } from "react";
import { useParams } from "react-router-dom";
import type { PostResponse } from "@/types/ApiResponses";
import { useScrollToEnd } from "@/pages/feeds/hooks/useScrollToEnd";
import { useUserPosts } from "./hooks/useUserPosts";
import { useProfileUser } from "./hooks/useProfileUser";
import Feed from "@/features/feed/components/Feed";
import { User } from "@/features/users";
import { Button } from "@/components/ui/button";
import { createFriendRequest } from "@/features/users/services/createFriendRequest";
import "./UserPage.css";
import { useAuthenticateMe } from "@/shared/hooks/usePostComments";

export function UserPage() {
	const { userId } = useParams();
	const profileId = Number(userId);
	
	const { user } = useAuthenticateMe();
	const authUserId = (user) ? user.id : null

	const isSelf = authUserId != null && authUserId === profileId;
	const [update, setUpdate] = useState<boolean>(true);
	const { posts, setPosts, state } = useUserPosts(profileId, update);
	const { profileUser, profileLoading, profileError: error } = useProfileUser(profileId);
	const [requestSent, setRequestSent] = useState<boolean>(false);
	const [requestLoading, setRequestLoading] = useState<boolean>(false);

	useScrollToEnd(() => {
		if (update) setUpdate(false)
		else setUpdate(true);
	});

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

	const onAddFriend = async () => {
		if (isSelf || requestLoading || requestSent) return;
		setRequestLoading(true);
		const ok = await createFriendRequest(profileId);
		setRequestLoading(false);
		if (ok) setRequestSent(true);
	};

	const showEmptyState = !state.loading && posts.length === 0 && profileUser != null;
	const showLoadingState = state.loading && posts.length === 0;

	const profileHeader = (
		<div className="profile-header">
			{profileUser && <User user={profileUser} />}
			{!isSelf && profileUser && (
				<Button onClick={onAddFriend} disabled={requestLoading || requestSent}>
					{requestSent ? "Request sent" : "Add Friend"}
				</Button>
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
