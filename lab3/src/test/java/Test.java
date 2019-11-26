public class Test {
    public static void main(String[] args) {
        DotDAOImpl dotDAO = new DotDAOImpl();
        dotDAO.activateComponent();
        dotDAO.addDot(new Dot(2,4,3));
        dotDAO.deactivateComponent();
    }
}
