import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ButtonGroup,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { productActions } from "../../redux/actions";

const AddEditProductPage = () => {
  const [formData, setFormData] = useState({
    brand: "",
    productName: "",
    images: null,
  });
  const loading = useSelector((state) => state.product.loading);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const redirectTo = useSelector((state) => state.product.redirectTo);
  const addOrEdit = params.id ? "Edit" : "Add";
  const productId = params.id;

  useEffect(() => {
    if (productId) {
      if (!selectedProduct) {
        dispatch(productActions.getSingleProduct(productId));
      }
      setFormData((formData) => ({
        ...formData,
        title: selectedProduct.brand,
        content: selectedProduct.productName,
        images: selectedProduct.images,
      }));
    }
  }, [productId, selectedProduct, dispatch]);

  const handleChange = (e) => {
    if (e.target.name === "images") {
      console.log(e.target.files);
      setFormData({ ...formData, images: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { brand, productName, images } = formData;
    if (addOrEdit === "Add") {
      dispatch(productActions.createNewProduct(brand, productName, images));
    } else if (addOrEdit === "Edit") {
      dispatch(productActions.updateProduct(selectedProduct._id, brand, productName));
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handleDelete = () => {
    // TODO : popup confirmation modal
    dispatch(productActions.deleteProduct(selectedProduct._id));
  };

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(productActions.setRedirectTo(""));
      } else {
        history.push(redirectTo);
        dispatch(productActions.setRedirectTo(""));
      }
    }
  }, [redirectTo, dispatch, history]);

  const uploadWidget = () => {
    // window.cloudinary.openUploadWidget(
    //   {
    //     cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    //     upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
    //     tags: ["socialBlog", "blogImages"],
    //   },
    //   function (error, result) {
    //     if (result && result.length) {
    //       setFormData({
    //         ...formData,
    //         images: result.map((res) => res.secure_url),
    //       });
    //     }
    //   }
    // );
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <div className="text-center mb-3">
              <h1 className="text-primary">{addOrEdit} blog</h1>
              <p className="lead">
                <i className="fas fa-user" />
              </p>
            </div>
            <Form.Group>
              <Form.Control
                type="text"
                required
                placeholder="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="10"
                placeholder="Product Name"
                name="Product Name"
                value={formData.productName}
                onChange={handleChange}
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Control
                type="file"
                name="images"
                multiple
                accept="image/png image/jpeg image/jpg"
                onChange={handleChange}
              />
            </Form.Group> */}
            <Form.Group>
              {formData?.images?.map((image) => (
                <img
                  src={image}
                  key={image}
                  width="90px"
                  height="60px"
                  alt="blog images"
                ></img>
              ))}
              <Button variant="info" onClick={uploadWidget}>
                {addOrEdit} Images
              </Button>
            </Form.Group>
            <ButtonGroup className="d-flex mb-3">
              {loading ? (
                <Button
                  className="mr-3"
                  variant="primary"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </Button>
              ) : (
                <Button className="mr-3" type="submit" variant="primary">
                  Submit
                </Button>
              )}
              <Button variant="light" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
            </ButtonGroup>
            {addOrEdit === "Edit" && (
              <ButtonGroup className="d-flex">
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  Delete Product
                </Button>
              </ButtonGroup>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEditProductPage;