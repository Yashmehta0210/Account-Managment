import React, { useState } from 'react';
import { Button, Modal, Form, Card, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrashAlt } from 'react-icons/fa';


const Dashboard = () => {
  const loggedInEmail = localStorage.getItem('loggedInEmail');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find((user) => user.email === loggedInEmail);

  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSaveItem = () => {
    if (newItem) {
      if (editingIndex !== null) {
        const updatedCards = [...cards];
        updatedCards[editingIndex] = newItem;
        setCards(updatedCards);
        setEditingIndex(null);
      } else {
        setCards([...cards, newItem]);
      }
      setNewItem('');
      setShowModal(false);
    }
  };

  const handleEdit = (index) => {
    setNewItem(cards[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  const filteredCards = cards.filter(card => card.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="container mt-5">
      <main>
        {user ? (
          <div>
            <h2>Welcome, {user.name}!</h2>
            {/* Search Input with Icon */}
            <InputGroup className="mb-3 mt-3" style={{width:500}}>
              <Form.Control
                type="text"
                placeholder="Search items"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>

            {/* Add New Item Button */}
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Add New Item
            </Button>

            {/* Cards Display */}
            <Container className="mt-4">
              <Row>
                {filteredCards.map((card, index) => (
                  <Col key={index} sm={6} md={4} lg={3} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title className="d-flex justify-content-between align-items-center">
                          {card}
                          <div>
                            <FaEdit
                              onClick={() => handleEdit(index)}
                              style={{ cursor: 'pointer', marginRight: '10px' }}
                            />
                            <FaTrashAlt
                              onClick={() => handleDelete(index)}
                              style={{ cursor: 'pointer' }}
                            />
                          </div>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        ) : (
          <p>No user data found.</p>
        )}
      </main>

      {/* Modal for Adding Item */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex !== null ? 'Edit Item' : 'Add New Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveItem}>
            {editingIndex !== null ? 'Save Changes' : 'Add Item'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
