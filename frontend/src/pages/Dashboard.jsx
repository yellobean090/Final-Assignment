import { useEffect, useState } from "react";
import api from "../api/axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .dash-root {
    min-height: 100vh;
    background: #0F1117;
    font-family: 'Inter', sans-serif;
    color: #E2E8F0;
    padding: 0 16px 60px;
  }

  /* ── Header ── */
  .dash-header {
    max-width: 720px;
    margin: 0 auto;
    padding: 28px 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #1E2235;
  }
  .dash-logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .dash-logo-dot {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: linear-gradient(135deg, #6C63FF, #22D3A5);
    flex-shrink: 0;
  }
  .dash-logo-text {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.3px;
    color: #F1F5F9;
  }
  .dash-logout-btn {
    background: transparent;
    border: 1px solid #2A2D3E;
    color: #94A3B8;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    padding: 7px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }
  .dash-logout-btn:hover { border-color: #6C63FF; color: #E2E8F0; }

  /* ── Main ── */
  .dash-main { max-width: 720px; margin: 0 auto; }

  /* ── Create card ── */
  .dash-create-card {
    background: #1A1D2E;
    border: 1px solid #2A2D3E;
    border-radius: 14px;
    padding: 24px;
    margin-top: 28px;
  }
  .dash-create-title {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #6C63FF;
    margin-bottom: 18px;
  }
  .dash-input,
  .dash-textarea {
    width: 100%;
    background: #0F1117;
    border: 1px solid #2A2D3E;
    border-radius: 8px;
    padding: 11px 14px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #E2E8F0;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    margin-bottom: 12px;
  }
  .dash-input::placeholder, .dash-textarea::placeholder { color: #4A5068; }
  .dash-input:focus, .dash-textarea:focus {
    border-color: #6C63FF;
    box-shadow: 0 0 0 3px rgba(108,99,255,0.15);
  }
  .dash-textarea { resize: vertical; min-height: 80px; }
  .dash-submit-btn {
    background: #6C63FF;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 22px;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
  }
  .dash-submit-btn:hover { background: #7C74FF; }
  .dash-submit-btn:active { transform: scale(0.97); }

  /* ── Tasks section ── */
  .dash-tasks-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 36px;
    margin-bottom: 16px;
  }
  .dash-tasks-label {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #94A3B8;
  }
  .dash-tasks-count {
    background: #1A1D2E;
    border: 1px solid #2A2D3E;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: #6C63FF;
    padding: 2px 10px;
  }

  /* ── Empty state ── */
  .dash-empty {
    text-align: center;
    padding: 60px 20px;
    color: #4A5068;
    font-size: 14px;
  }
  .dash-empty-icon { font-size: 36px; margin-bottom: 12px; }

  /* ── Task card ── */
  .dash-task-card {
    background: #1A1D2E;
    border: 1px solid #2A2D3E;
    border-left: 3px solid #6C63FF;
    border-radius: 12px;
    padding: 18px 20px;
    margin-bottom: 10px;
    transition: border-color 0.15s;
  }
  .dash-task-card.completed {
    border-left-color: #22D3A5;
    opacity: 0.75;
  }
  .dash-task-card:hover { border-color: #3A3D5E; border-left-color: inherit; }
  .dash-task-card.completed:hover { border-left-color: #22D3A5; }

  .dash-task-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }
  .dash-task-title {
    font-size: 15px;
    font-weight: 600;
    color: #F1F5F9;
    line-height: 1.4;
  }
  .dash-task-card.completed .dash-task-title {
    text-decoration: line-through;
    color: #64748B;
  }
  .dash-task-badge {
    flex-shrink: 0;
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 20px;
  }
  .badge-pending { background: rgba(108,99,255,0.15); color: #9B94FF; }
  .badge-done { background: rgba(34,211,165,0.12); color: #22D3A5; }

  .dash-task-desc {
    font-size: 13px;
    color: #64748B;
    line-height: 1.6;
    margin-top: 8px;
  }
  .dash-task-actions {
    display: flex;
    gap: 8px;
    margin-top: 14px;
  }
  .dash-action-btn {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 7px;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.15s;
  }
  .btn-toggle {
    background: rgba(108,99,255,0.1);
    color: #9B94FF;
    border-color: rgba(108,99,255,0.2);
  }
  .btn-toggle:hover { background: rgba(108,99,255,0.2); }
  .dash-task-card.completed .btn-toggle {
    background: rgba(34,211,165,0.08);
    color: #22D3A5;
    border-color: rgba(34,211,165,0.2);
  }
  .btn-delete {
    background: transparent;
    color: #64748B;
    border-color: #2A2D3E;
  }
  .btn-delete:hover { background: rgba(239,68,68,0.1); color: #F87171; border-color: rgba(239,68,68,0.3); }
`;

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", { title, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTask = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, { completed: !task.completed }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const pending = tasks.filter((t) => !t.completed).length;

  return (
    <>
      <style>{styles}</style>
      <div className="dash-root">
        {/* Header */}
        <header className="dash-header">
          <div className="dash-logo">
            <div className="dash-logo-dot" />
            <span className="dash-logo-text">Taskboard</span>
          </div>
          <button className="dash-logout-btn" onClick={logout}>Sign out</button>
        </header>

        <main className="dash-main">
          {/* Create task */}
          <div className="dash-create-card">
            <p className="dash-create-title">New Task</p>
            <form onSubmit={createTask}>
              <input
                className="dash-input"
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="dash-textarea"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="dash-submit-btn" type="submit">Add Task</button>
            </form>
          </div>

          {/* Task list */}
          <div className="dash-tasks-header">
            <span className="dash-tasks-label">Tasks</span>
            {tasks.length > 0 && (
              <span className="dash-tasks-count">{pending} pending</span>
            )}
          </div>

          {tasks.length === 0 ? (
            <div className="dash-empty">
              <div className="dash-empty-icon">📋</div>
              <p>No tasks yet. Add one above.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className={`dash-task-card${task.completed ? " completed" : ""}`}
              >
                <div className="dash-task-top">
                  <span className="dash-task-title">{task.title}</span>
                  <span className={`dash-task-badge ${task.completed ? "badge-done" : "badge-pending"}`}>
                    {task.completed ? "Done" : "Pending"}
                  </span>
                </div>
                {task.description && (
                  <p className="dash-task-desc">{task.description}</p>
                )}
                <div className="dash-task-actions">
                  <button className="dash-action-btn btn-toggle" onClick={() => toggleTask(task)}>
                    {task.completed ? "Mark Pending" : "Mark Complete"}
                  </button>
                  <button className="dash-action-btn btn-delete" onClick={() => deleteTask(task._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </main>
      </div>
    </>
  );
}

export default Dashboard;