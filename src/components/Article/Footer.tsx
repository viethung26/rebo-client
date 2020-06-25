import React, { useState, createElement, useEffect } from 'react'
import styled from 'styled-components'
import { withTranslation } from 'react-i18next'
import { Button, Typography, Comment, Avatar, Tooltip, Input, List, Divider } from 'antd'
import { CommentOutlined, LikeFilled, LikeOutlined, UserOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { activeUserState } from 'stores'
import { io, ioListener } from '../../sockets'
import moment from 'moment'

const { Text } = Typography
const getCommentData = (arr: any[]) => {
    return arr.map((comment: any) => ({
        actions: [<span key="comment-basic-like">
            <Tooltip title="Like">
                {createElement('liked' === 'liked' ? LikeFilled : LikeOutlined, {
                    onClick: () => console.info('9779 click'),
                })}
            </Tooltip>
            {/* <span className="comment-action">{10}</span> */}
        </span>],
        author: <a href="#">{comment?.author?.displayname || comment?.author?.username}</a>,
        datetime: <Tooltip title={"ngay"}>
            <span>{moment(comment.updatedAt).fromNow()}</span>
        </Tooltip>,
        content:
            <p>
                {comment.content}
            </p>,
        avatar: <Avatar icon={<UserOutlined />} src={comment?.author?.avatar} />
    }))
}
const Footer = (props: any) => {
    const activeUser = useRecoilValue(activeUserState) || {}
    const [commentOpen, setCommentOpen] = useState(false)
    const [comment, setComment] = useState("")
    const { t, articleID, votes = [], comments, onLike, onComment } = props
    const commentList = getCommentData(comments)
    const isVoted = votes.includes(activeUser._id)
    const handleLike = async () => {
        io.emit('article-like', { a_id: articleID })
        onLike()
        // fetch(`/api/v1/article/like/${articleID}`, {
        //     method: 'PUT'
        // }).then(res => res.json()).then(res => {
        //     console.info('9779 res', res, activeUser)
        //     setVoted(!isVoted)
        // })
    }
    const handleComment = async (e) => {
        if (e.keyCode === 13) {
            const content = comment.trim()
            if (content !== "") {
                setComment("")
                console.info('9779 post comment', content)
                io.emit('article-comment', { a_id: articleID, content })
                onComment({ content, article: articleID, author: activeUser, createdAt: new Date().toISOString() })
                // fetch("/api/v1/comment", {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify({
                //         content,
                //         article: articleID
                //     })
                // }).then(res => res.json())
                //     .then(res => {
                //         if (res) {
                //             setNewComments([...newComments, {
                //                 author: activeUser,
                //                 content: res.content
                //             }])
                //         }
                //     })
            }
        }
    }
    return (
        <StyledFooter>
            <StyledGroupButton>
                <Button onClick={handleLike}>{isVoted ? <LikeFilled /> : <LikeOutlined />}<Text>{votes.length}</Text></Button>
                <Button onClick={() => setCommentOpen(!commentOpen)}><CommentOutlined /><Text>{(comments?.length || 0)}</Text></Button>
            </StyledGroupButton>
            {commentOpen && <>
                <Divider />
                <List
                    loading={false}
                    locale={{ emptyText: <></> }}
                    dataSource={commentList}
                    renderItem={item => (
                        <li>
                            <Comment
                                // actions={
                                //     [<span key="comment-basic-like">
                                //         <Tooltip title="Like">
                                //             {createElement('liked' === 'liked' ? LikeFilled : LikeOutlined, {
                                //                 onClick: () => console.info('9779 click'),
                                //             })}
                                //         </Tooltip>
                                //         <span className="comment-action">{10}</span>
                                //     </span>]
                                // }
                                author={item.author}
                                datetime={item.datetime}
                                content={item.content}
                                avatar={item.avatar}
                            />
                        </li>
                    )}
                />
                <Comment
                    avatar={<Avatar icon={<UserOutlined />} src={activeUser?.avatar} />}
                    content={<Input placeholder="Write your comment" value={comment} onChange={e => setComment(e.target.value)} onKeyDown={handleComment} />}
                />
            </>
            }


        </StyledFooter>
    )
}
export default withTranslation()(Footer)
const StyledGroupButton = styled.div`
    span {
        margin-right: 4px;
    }
`
const StyledFooter = styled.div`
    >input {
        padding: 8px;
        width: 100%;
        &:focus {
            outline: none;
        }
    }
`