import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { PostResponse } from "@/types/ApiResponses";
import { useScrollToEnd } from "@/pages/feeds/hooks/useScrollToEnd";
import { useUserPosts } from "./hooks/useUserPosts";
import { useProfileUser } from "./hooks/useProfileUser";
import Feed from "@/features/feed/components/Feed";
import { PostModal } from "@/features/posts";
import { User } from "@/features/users";
import { Button } from "@/components/ui/button";
import { createFriendRequest } from "@/features/users/services/createFriendRequest";
import "./UserPage.css";

export function UserPage() {
	const { userId: routeUserId } = useParams();
	const authUserId = localStorage.getItem("user_id");
	const resolvedUserId = useMemo(() => {
		if (routeUserId) return Number.parseInt(routeUserId);
		if (authUserId) return Number.parseInt(authUserId);
		return null;
	}, [routeUserId, authUserId]);

	const isSelf = authUserId != null && resolvedUserId != null && Number.parseInt(authUserId) === resolvedUserId;
	const [update, setUpdate] = useState<boolean>(true);
	const { posts, setPosts, state } = useUserPosts(resolvedUserId, update);
	const [modal, setModal] = useState<boolean>(false);
	const [modalPost, setModalPost] = useState<PostResponse | null>(null);
	const { profileUser, profileLoading, profileError: error } = useProfileUser(resolvedUserId);
	const [requestSent, setRequestSent] = useState<boolean>(false);
	const [requestLoading, setRequestLoading] = useState<boolean>(false);

	useScrollToEnd(() => {
		if (update) setUpdate(false)
		else setUpdate(true);
	});

	useEffect(() => {
        const timer = setTimeout(() => {
            setRequestSent(false);
            setRequestLoading(false);
            setModal(false);
        }, 0);

        return () => clearTimeout(timer);
    }, [resolvedUserId]);

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
        setModalPost(post);
        setModal(true);
    };

    const onClickModal = () => setModal(false);

	const onAddFriend = async () => {
		if (resolvedUserId == null || requestLoading || requestSent) return;
		setRequestLoading(true);
		const ok = await createFriendRequest(resolvedUserId);
		setRequestLoading(false);
		if (ok) setRequestSent(true);
	};

	const showEmptyState = !state.loading && posts.length === 0 && profileUser != null;
	const showLoadingState = state.loading && posts.length === 0;
	console.log(profileUser);
	console.log(profileUser?.friend_status);
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

	const onButtonClick = () => {
	if (profileUser?.friend_status === "REQUESTED") {
		acceptFriendRequest(profileUser.id);
	} else {
		onAddFriend();
	}
	};

	const profileHeader = (
	<div className="profile-header">
		{profileUser && <User user={profileUser} />}

		{!isSelf && profileUser && (
		<Button
			onClick={onButtonClick}
			disabled={requestLoading || buttonConfig.disabled}
		>
			{buttonConfig.label}
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
        {modal && modalPost && (
        <PostModal
            post={modalPost}
            onClick={onClickModal}
            onDelete={onDelete}
        />
        )}

        <div className="profile-page">
        {profileFeed}
        </div>
    </>
    );

}
