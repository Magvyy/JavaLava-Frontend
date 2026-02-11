import { useState, type MouseEvent } from "react";
import { useParams } from "react-router-dom";
import type { PostResponse } from "@/types/ApiResponses";
import { useScrollToEnd } from "@/pages/feeds/hooks/useScrollToEnd";
import { useUserPosts } from "./hooks/useUserPosts";
import { useProfileUser } from "./hooks/useProfileUser";
import { ProfilePic, User } from "@/features/users";
import { FriendActions } from "@/features/users/components/FriendActions";
import { useAuthenticateMe } from "@/shared/hooks/useAuthenticateMe";
import { ReadPost } from "@/features/posts";
import { PostHeader } from "@/features/posts/components/PostHeader";
import { PostContentReader } from "@/features/posts/components/read/PostContentReader";
import { PostFooterReader } from "@/features/posts/components/read/PostFooterReader";

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
	<div className="w-4/5 flex flex-col items-center justify-between gap-[16px] flex-wrap">
		{profileUser &&
			<User
				user={profileUser}
				profilePicChild={
					<ProfilePic
						className="w-[200px] h-[200px] rounded-[50%]"
						onClick={(e: MouseEvent<HTMLImageElement>) => {
							e.stopPropagation();
						}}
					/>
				}
				className="flex flex-col gap-[10px] text-center"
			/>
		}

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
        <div className="w-4/5 text-left">
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
			<div className="flex flex-col items-center gap-[20px] w-3/5">
				{posts.map(post => (
					<ReadPost
						key={post.id}
						post={post}
						onClick={onClickPost}
						headerChild={
							<PostHeader
								post_id={post.id}
								onDelete={onDelete}
								user={post.user}
							/>
						}
						contentChild={
							<PostContentReader
								post={post}
							/>
						}
						footerChild={
							<PostFooterReader
								post_id={post.id}
								liked={post.liked}
							/>
						}
					/>
				))}
			</div>
		</>
	);

	return (
    <>
        <div className="flex flex-col items-center gap-[16px] w-full">
			{profileFeed}
        </div>
    </>
    );

}
