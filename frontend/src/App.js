import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Search, Edit, Trash2, Plus, User, LogOut, Menu, X } from 'lucide-react';

// Mock data for demo
const MOCK_USER = { id: '1', name: 'John Doe', email: 'john@example.com', isAdmin: false };
const MOCK_POSTS = [
  {
    id: '1',
    title: 'Getting Started with React',
    content: '<p>React is a powerful library for building user interfaces...</p>',
    author: { id: '1', name: 'John Doe' },
    category: 'Technology',
    likes: 24,
    comments: [
      { id: '1', author: 'Jane Smith', content: 'Great post!', createdAt: new Date() }
    ],
    createdAt: new Date('2024-01-15'),
    tags: ['react', 'javascript', 'frontend']
  },
  {
    id: '2',
    title: 'Node.js Best Practices',
    content: '<p>Building scalable backend applications with Node.js...</p>',
    author: { id: '2', name: 'Sarah Wilson' },
    category: 'Backend',
    likes: 18,
    comments: [],
    createdAt: new Date('2024-01-20'),
    tags: ['nodejs', 'backend', 'javascript']
  }
];

export default function BloggingPlatform() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [view, setView] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);

  // Login simulation
  const handleLogin = (email, password) => {
    setCurrentUser(MOCK_USER);
    setView('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('home');
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(posts.map(p => p.category))];

  // Post actions
  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      setPosts(posts.map(p => p.id === postId ? {...p, likes: p.likes - 1} : p));
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts(posts.map(p => p.id === postId ? {...p, likes: p.likes + 1} : p));
    }
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, {
            id: Date.now().toString(),
            author: currentUser.name,
            content: comment,
            createdAt: new Date()
          }]
        };
      }
      return p;
    }));
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(p => p.id !== postId));
    setView('home');
  };

  const handleSavePost = (postData) => {
    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? {...p, ...postData} : p));
    } else {
      const newPost = {
        id: Date.now().toString(),
        ...postData,
        author: currentUser,
        likes: 0,
        comments: [],
        createdAt: new Date()
      };
      setPosts([newPost, ...posts]);
    }
    setEditingPost(null);
    setView('home');
  };

  // Views
  const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <div className="max-w-md mx-auto mt-20 p-10 bg-white rounded-2xl shadow-2xl border border-indigo-100">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4">
            <User className="text-white" size={32} />
          </div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2">Sign in to continue to BlogHub</p>
        </div>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 mb-6 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
        />
        <button
          onClick={() => handleLogin(email, password)}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Sign In
        </button>
        <p className="mt-6 text-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
          💡 Demo: Use any email/password to login
        </p>
      </div>
    );
  };

  const EditorView = () => {
    const [title, setTitle] = useState(editingPost?.title || '');
    const [content, setContent] = useState(editingPost?.content || '');
    const [category, setCategory] = useState(editingPost?.category || 'Technology');
    const [tags, setTags] = useState(editingPost?.tags?.join(', ') || '');

    return (
      <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-2xl border border-indigo-100">
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {editingPost ? '✏️ Edit Post' : '✨ Create New Post'}
          </h2>
          <p className="text-gray-500">Share your thoughts with the world</p>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Post Title</label>
            <input
              type="text"
              placeholder="Enter an engaging title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none text-xl font-bold transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer"
            >
              <option>Technology</option>
              <option>Backend</option>
              <option>Frontend</option>
              <option>Design</option>
              <option>DevOps</option>
              <option>Mobile</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
            <textarea
              placeholder="Write your amazing content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none h-80 resize-none transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
            <input
              type="text"
              placeholder="react, javascript, web development"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
            />
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => handleSavePost({
              title,
              content: `<p>${content}</p>`,
              category,
              tags: tags.split(',').map(t => t.trim())
            })}
            className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {editingPost ? '💾 Update Post' : '🚀 Publish Post'}
          </button>
          <button
            onClick={() => { setEditingPost(null); setView('home'); }}
            className="px-8 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const PostDetailView = () => {
    const [commentText, setCommentText] = useState('');

    return (
      <div className="max-w-5xl mx-auto p-8">
        <button
          onClick={() => setView('home')}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-all duration-200 hover:gap-3"
        >
          ← Back to posts
        </button>
        <div className="bg-white rounded-2xl shadow-2xl p-10 border border-indigo-100">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                {selectedPost.title}
              </h1>
              <div className="flex items-center gap-6 text-gray-600 flex-wrap">
                <span className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                  <User size={18} />
                  <span className="font-semibold">{selectedPost.author.name}</span>
                </span>
                <span className="flex items-center gap-2">
                  📅 {selectedPost.createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {selectedPost.category}
                </span>
              </div>
            </div>
            {currentUser?.id === selectedPost.author.id && (
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditingPost(selectedPost); setView('editor'); }}
                  className="p-3 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200"
                >
                  <Edit size={22} />
                </button>
                <button
                  onClick={() => handleDeletePost(selectedPost.id)}
                  className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none mb-8 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{__html: selectedPost.content}} />

          <div className="flex gap-3 mb-8 flex-wrap">
            {selectedPost.tags.map(tag => (
              <span key={tag} className="bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-700 transition-all duration-200 cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex gap-6 mb-10 pt-8 border-t-2 border-gray-100">
            <button
              onClick={() => handleLike(selectedPost.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                likedPosts.includes(selectedPost.id)
                  ? 'bg-red-50 text-red-600 hover:bg-red-100'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <Heart size={22} fill={likedPosts.includes(selectedPost.id) ? 'currentColor' : 'none'} />
              <span className="text-lg">{selectedPost.likes}</span>
            </button>
            <span className="flex items-center gap-3 px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold">
              <MessageCircle size={22} />
              <span className="text-lg">{selectedPost.comments.length}</span>
            </span>
          </div>

          <div className="border-t-2 border-gray-100 pt-10">
            <h3 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              💬 Comments
            </h3>
            {currentUser && (
              <div className="mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-100">
                <textarea
                  placeholder="Share your thoughts..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-4 border-2 border-indigo-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none resize-none transition-all duration-200 bg-white"
                  rows="4"
                />
                <button
                  onClick={() => {
                    handleComment(selectedPost.id, commentText);
                    setCommentText('');
                  }}
                  className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Post Comment
                </button>
              </div>
            )}
            <div className="space-y-5">
              {selectedPost.comments.map(comment => (
                <div key={comment.id} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-l-4 border-indigo-500 hover:shadow-lg transition-all duration-200">
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-bold text-lg text-gray-800">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {comment.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HomeView = () => (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-10">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" size={22} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200 bg-white shadow-md hover:shadow-lg text-lg"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 focus:outline-none transition-all duration-200 bg-white shadow-md hover:shadow-lg cursor-pointer font-semibold text-gray-700"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? '📚 All Categories' : `📁 ${cat}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-8">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-indigo-50 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2
                  className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 cursor-pointer transition-all duration-200 leading-tight"
                  onClick={() => { setSelectedPost(post); setView('detail'); }}
                >
                  {post.title}
                </h2>
                <div className="flex items-center gap-4 text-gray-600 text-sm flex-wrap">
                  <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full font-medium">
                    <User size={16} />
                    {post.author.name}
                  </span>
                  <span className="flex items-center gap-2">
                    📅 {post.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-gray-700 mb-6 line-clamp-2 text-lg leading-relaxed" dangerouslySetInnerHTML={{__html: post.content}} />
            
            <div className="flex justify-between items-center pt-6 border-t-2 border-gray-100">
              <div className="flex gap-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                    likedPosts.includes(post.id)
                      ? 'bg-red-50 text-red-600 hover:bg-red-100'
                      : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  <Heart size={20} fill={likedPosts.includes(post.id) ? 'currentColor' : 'none'} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200">
                  <MessageCircle size={20} />
                  <span>{post.comments.length}</span>
                </button>
              </div>
              <button
                onClick={() => { setSelectedPost(post); setView('detail'); }}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold hover:gap-3 transition-all duration-200"
              >
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-200">
              BlogHub
            </h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {currentUser ? (
                <>
                  <button
                    onClick={() => { setEditingPost(null); setView('editor'); }}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Plus size={20} />
                    New Post
                  </button>
                  <button
                    onClick={() => setView('profile')}
                    className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 font-semibold px-4 py-2 rounded-xl hover:bg-indigo-50 transition-all duration-200"
                  >
                    <User size={20} />
                    {currentUser.name}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-semibold px-4 py-2 rounded-xl hover:bg-red-50 transition-all duration-200"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setView('login')}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Login
                </button>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-3">
              {currentUser ? (
                <>
                  <button
                    onClick={() => { setEditingPost(null); setView('editor'); setShowMobileMenu(false); }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                  >
                    <Plus size={20} />
                    New Post
                  </button>
                  <button
                    onClick={() => { setView('profile'); setShowMobileMenu(false); }}
                    className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-indigo-600 font-semibold px-4 py-3 rounded-xl hover:bg-indigo-50 transition-all duration-200"
                  >
                    <User size={20} />
                    {currentUser.name}
                  </button>
                  <button
                    onClick={() => { handleLogout(); setShowMobileMenu(false); }}
                    className="w-full flex items-center justify-center gap-2 text-gray-700 hover:text-red-600 font-semibold px-4 py-3 rounded-xl hover:bg-red-50 transition-all duration-200"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setView('login'); setShowMobileMenu(false); }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                >
                  Login
                </button>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10">
        {view === 'home' && <HomeView />}
        {view === 'login' && <LoginView />}
        {view === 'editor' && currentUser && <EditorView />}
        {view === 'detail' && selectedPost && <PostDetailView />}
        {view === 'profile' && currentUser && (
          <div className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-2xl border border-indigo-100">
            <div className="text-center mb-10 pb-8 border-b-2 border-gray-100">
              <div className="inline-block p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4 shadow-xl">
                <User className="text-white" size={48} />
              </div>
              <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {currentUser.name}
              </h2>
              <p className="text-gray-600 text-lg">{currentUser.email}</p>
            </div>
            <h3 className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              📝 My Posts
            </h3>
            <div className="space-y-4">
              {posts.filter(p => p.author.id === currentUser.id).map(post => (
                <div key={post.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-300 transition-all duration-200 cursor-pointer bg-gradient-to-br from-white to-gray-50">
                  <h4 className="text-2xl font-bold mb-3 text-gray-800">{post.title}</h4>
                  <div className="flex gap-6 text-sm text-gray-600">
                    <span className="flex items-center gap-2 font-semibold">
                      <Heart size={16} className="text-red-500" />
                      {post.likes} likes
                    </span>
                    <span className="flex items-center gap-2 font-semibold">
                      <MessageCircle size={16} className="text-indigo-500" />
                      {post.comments.length} comments
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


<div className="bg-red-500 text-white p-4">Test</div>
