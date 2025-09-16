<?php
class Course {
    private $db;

    public function __construct() {
        require_once '../includes/db.php';
        $this->db = new Database();
    }

    public function getAllCourses() {
        $query = "SELECT * FROM courses ORDER BY created_at DESC";
        return $this->db->query($query)->fetchAll();
    }

    public function getCourseById($id) {
        $query = "SELECT * FROM courses WHERE id = ?";
        return $this->db->query($query, [$id])->fetch();
    }
} 