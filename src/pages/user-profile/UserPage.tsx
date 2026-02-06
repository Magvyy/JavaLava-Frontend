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
import { acceptFriendRequest } from "@/features/users/services/acceptFriendRequest";
import "./UserPage.css";
import { useAuthenticateMe } from "@/shared/hooks/useAuthenticateMe";
import { CreatePost } from "@/features/posts";
import { declineFriendRequest } from "@/features/users/services/declineFriendRequest";
import { removeFriend } from "@/features/users/services/removeFriend";

export function UserPage() {
	const { userId } = useParams();
	const profileId = Number(userId);
	
	const { user } = useAuthenticateMe();
	const authUserId = (user) ? user.id : null

	const isSelf = authUserId != null && authUserId === profileId;
	const [update, setUpdate] = useState<boolean>(true);
	const { posts, setPosts, state, resetPosts } = useUserPosts(profileId, update);
	const { profileUser, setProfileUser, profileLoading, profileError: error } = useProfileUser(profileId);
	const [requestLoading, setRequestLoading] = useState<boolean>(false);

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
	
	
	const buttonConfig = (() => {
	switch (profileUser?.friend_status) {
		case "FRIENDS":
		return { label: "Friends", disabled: true };

		case "PENDING":
		return { label: "Request sent", disabled: true };

		case "REQUESTED":
		return { label: "Accept request", disabled: false };

		case "NOT_FRIENDS":
		default:
		return { label: "Add Friend", disabled: false };
	}
	})();

	const onAcceptClick = async () => {
		if (requestLoading || !profileUser) return;

		setRequestLoading(true);

		const ok = await acceptFriendRequest(profileUser.id);
		if (ok) {
			setProfileUser({ ...profileUser, friend_status: "FRIENDS" });
			//new posts may be visible now
			resetPosts();
			setUpdate(prev => !prev);
		}

		setRequestLoading(false);
	};

	const onDeclineClick = async () => {
		if (requestLoading || !profileUser) return;

		setRequestLoading(true);

		const ok = await declineFriendRequest(profileUser.id);
		if (ok) {
			// back to not friends
			setProfileUser({ ...profileUser, friend_status: "NOT_FRIENDS" });
		}

		setRequestLoading(false);
	};
	const onRemoveFriendClick = async () => {
		if (!profileUser || requestLoading) return;

		const confirmed = window.confirm(
			`Remove ${profileUser.user_name} from your friends?`
		);
		if (!confirmed) return;

		setRequestLoading(true);

		const ok = await removeFriend(profileUser.id);
		if (ok) {
			setProfileUser({ ...profileUser, friend_status: "NOT_FRIENDS" });
			resetPosts();
			setUpdate(prev => !prev);
		}

		setRequestLoading(false);
	};

	const onButtonClick = async () => {
		if (requestLoading || isSelf) return;

		setRequestLoading(true);

		
		if (profileUser?.friend_status === "NOT_FRIENDS") {
			const ok = await createFriendRequest(profileUser!.id);
			if (ok) setProfileUser({ ...profileUser, friend_status: "PENDING" });
		}

		setRequestLoading(false);
	};

	const profileHeader = (
	<div className="profile-header">
		{profileUser && <User user={profileUser} />}

		{!isSelf && profileUser && (
		<>
			{profileUser.friend_status === "REQUESTED" && (
				<div className="friend-actions">
					<Button
						onClick={onAcceptClick}
						disabled={requestLoading}
					>
						Accept
					</Button>

					<Button
						variant="outline"
						onClick={onDeclineClick}
						disabled={requestLoading}
					>
						Decline
					</Button>
				</div>
			)}

			{profileUser.friend_status === "FRIENDS" && (
				<Button
					variant="outline"
					onClick={onRemoveFriendClick}
					disabled={requestLoading}
				>
					Remove friend
				</Button>
			)}

			{profileUser.friend_status !== "REQUESTED" &&
			profileUser.friend_status !== "FRIENDS" && (
				<Button
					onClick={onButtonClick}
					disabled={requestLoading || buttonConfig.disabled}
				>
					{buttonConfig.label}
				</Button>
			)}
		</>
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
