import { useRef, type MouseEvent } from "react";
import { useParams } from "react-router-dom";
import { useScrollToEnd } from "@/shared/hooks/useScrollToEnd";
import { useProfileUser } from "./hooks/useProfileUser";
import { ProfilePic, User } from "@/features/users";
import { FriendActions } from "@/features/users/components/FriendActions";
import { ReadPost } from "@/features/posts";
import { PostHeader } from "@/features/posts/components/PostHeader";
import { PostContentReader } from "@/features/posts/components/read/PostContentReader";
import { PostFooterReader } from "@/features/posts/components/read/PostFooterReader";
import type { PostResponse } from "@/shared/types/PostApi";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "@/shared/components/Loader";

export function UserPage() {
	const { userId } = useParams();
	const profileId = Number(userId);
	
    const { authUser, authState } = useAuth();
	const authUserId = (authUser) ? authUser.id : null

	const isSelf = authUserId != null && authUserId === profileId;

	const containerRef = useRef<HTMLDivElement>(null);
	const { data: posts, setData: setPosts, state, reset } = useScrollToEnd<PostResponse>(
		"/posts/user/" + Number(userId),
		containerRef
	);

	const { profileUser, setProfileUser, profileLoading, profileError: error } = useProfileUser(profileId);

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
        window.location.href = "/posts/" + post.id;
    }


	const showEmptyState = !state.loading && posts.length === 0 && profileUser != null;
	const showLoadingState = state.loading && posts.length === 0;
	
	const profileHeader = (
	<div className="w-4/5 flex flex-col items-center justify-between gap-[16px]">
		{profileUser &&
			<>
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
				<FriendActions
					profileUser={profileUser}
					isSelf={isSelf}
					onFriendStatusChange={(status) =>
						setProfileUser({ ...profileUser, friend_status: status })
					}
					onVisibilityChange={() => {
						reset();
					}}
				/>
			</>
		}
	</div>
	);

	const profileState = (
        <div className="w-4/5 text-left">
            {profileLoading && <p>Loading profile...</p>}
            {!profileLoading && error === "not-found" && <p>User does not exist.</p>}
            {showEmptyState && <p>@{profileUser?.user_name} hasn’t posted yet.</p>}
        </div>
    );

	const profileFeed = (
		<>
			<Loader state={state} data={posts} className="w-2/5 p-0 min-w-[350px]">
				{(posts, spinner) => 
					<div
						className="h-full p-5 flex flex-col items-center gap-[20px] min-w-[200px] overflow-auto scrollbar-hide"
						ref={containerRef}
					>
							{profileHeader}
							{profileState}
							{posts.map(post => (
								<ReadPost
									key={post.id}
									post={post}
									onClick={onClickPost}
									className="w-full p-0 min-w-[350px]"
								>
									<PostHeader
										postId={post.id}
										onDelete={onDelete}
										user={post.user}
									/>
									<PostContentReader
										post={post}
									/>
									<PostFooterReader
										postId={post.id}
										liked={post.liked}
										likeCount={post.like_count}
										commentCount={post.comment_count}
									/>
								</ReadPost>
							))}
						{spinner}
					</div>
				}
			</Loader>
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