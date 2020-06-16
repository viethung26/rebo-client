import React, { useState, createElement, useEffect } from 'react'
import styled from 'styled-components'
import { withTranslation } from 'react-i18next'
import { Button, Typography, Comment, Avatar, Tooltip, Input, List, Divider } from 'antd'
import { CommentOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons'
import { useRecoilValue } from 'recoil'
import { activeUserState } from 'stores'
import {io, ioListener} from '../../sockets'
const { Text } = Typography
const getCommentData = (arr: any[]) => {
    return arr.map((comment: any) => ({
        actions: [<span key="comment-basic-like">
            <Tooltip title="Like">
                {createElement('liked' === 'liked' ? LikeFilled : LikeOutlined, {
                    onClick: () => console.info('9779 click'),
                })}
            </Tooltip>
            <span className="comment-action">{10}</span>
        </span>],
        author: <a href="#">{comment?.author?.username}</a>,
        datetime: <Tooltip title={"ngay"}>
            <span>{"20-12-2019"}</span>
        </Tooltip>,
        content:
            <p>
                {comment.content}
            </p>,
        avatar: <Avatar src="https://i1.wp.com/meovatcuocsong.vn/wp-content/uploads/2018/06/anh-dai-dien-facebook-de-thuong5.jpg?w=770&ssl=1" />
    }))
}
const Footer = (props: any) => {
	const activeUser = useRecoilValue(activeUserState) || {}
    const [commentOpen, setCommentOpen] = useState(false)
    const [newComments, setNewComments] = useState([])
    const [comment, setComment] = useState("")
    const [isVoted, setVoted] = useState(undefined)
    const { t, articleID, votes = [], comments } = props
    const commentList = getCommentData([...comments, ...newComments])
    const handleLike = async () => {
        console.info('9779 like')
        fetch(`/api/v1/article/like/${articleID}`, {
            method: 'PUT'
        }).then(res => res.json()).then(res => {
            console.info('9779 res', res, activeUser)
            io.emit('article-like', articleID)
            setVoted(!isVoted)
        })
    }
    const handlePostComment = async (e) => {
        if (e.keyCode === 13) {
            const content = comment.trim()
            if (content !== "") {
                setComment("")
                console.info('9779 post comment', content)
                fetch("/api/v1/comment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        content,
                        article: articleID
                    })
                }).then(res => res.json())
                    .then(res => {
                        if (res) {
                            setNewComments([...newComments, {
                                author: activeUser,
                                content: res.content
                            }])
                        }
                    })

            }
        }
    }
    useEffect(() => {
        console.info('9779 data')
        io.on(`data-${articleID}`, data=>console.info('9779 d', data))
        // ioListener.push((data) => {
        //     console.info('9779 data2', data)
        // } )
        if (votes.includes(activeUser._id?.toString()) && typeof isVoted === 'undefined') {
            setVoted(true)
        }
    }, [])
    return (
        <StyledFooter>
            <StyledGroupButton>
                <Button onClick={handleLike}>{isVoted ? <LikeFilled /> : <LikeOutlined/>}<Text>{votes.length}</Text></Button>
                <Button onClick={() => setCommentOpen(!commentOpen)}><CommentOutlined /><Text>{(comments?.length || 0) + newComments.length}</Text></Button>
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
                                actions={
                                    [<span key="comment-basic-like">
                                        <Tooltip title="Like">
                                            {createElement('liked' === 'liked' ? LikeFilled : LikeOutlined, {
                                                onClick: () => console.info('9779 click'),
                                            })}
                                        </Tooltip>
                                        <span className="comment-action">{10}</span>
                                    </span>]
                                }
                                author={item.author}
                                datetime={item.datetime}
                                content={item.content}
                                avatar={item.avatar}
                            />
                        </li>
                    )}
                />
                <Comment
                    avatar={<Avatar src="https://i1.wp.com/meovatcuocsong.vn/wp-content/uploads/2018/06/anh-dai-dien-facebook-de-thuong5.jpg?w=770&ssl=1" />}
                    content={<Input placeholder="Write your comment" value={comment} onChange={e => setComment(e.target.value)} onKeyDown={handlePostComment} />}
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