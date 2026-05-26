# Database Schema

## Tables

### users
- id
- email
- password_hash
- created_at

### projects
- id
- name
- jurisdiction
- created_at

### reviews
- id
- project_id
- discipline
- status

### documents
- id
- review_id
- file_name
- storage_url

### findings
- id
- review_id
- title
- risk_level
- recommendation
