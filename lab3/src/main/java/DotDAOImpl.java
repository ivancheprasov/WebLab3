import org.eclipse.persistence.config.PersistenceUnitProperties;
import org.osgi.service.component.annotations.Activate;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Deactivate;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.*;

public class DotDAOImpl implements DotDAO {

    private EntityManagerFactory entityManagerFactory;
    private EntityManager entityManager;

    protected void activateComponent() {
        Map map = new HashMap();
        map.put(PersistenceUnitProperties.CLASSLOADER, getClass().getClassLoader());
        if(System.getProperty("os.name").contains("Windows")) {
            entityManagerFactory = Persistence.createEntityManagerFactory("postgresql-eclipselink", map);
        } else {
            entityManagerFactory = Persistence.createEntityManagerFactory("postgresql-eclipselink-helios", map);
        }
        entityManager = entityManagerFactory.createEntityManager();
    }

    protected void deactivateComponent() {
        if (entityManager.getTransaction().isActive()) {
            entityManager.getTransaction().commit();
        }
        entityManager.close();
        entityManagerFactory.close();
        entityManager = null;
        entityManagerFactory = null;
    }

    public DotDAOImpl() {
    }

    public List<Dot> getDots() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Dot> cq = cb.createQuery(Dot.class);
        Root<Dot> root = cq.from(Dot.class);
        CriteriaQuery<Dot> allDots = cq.select(root);
        TypedQuery<Dot> dotTypedQuery = entityManager.createQuery(allDots);
        return dotTypedQuery.getResultList();
    }


    public void addDot(Dot newDot) {
        entityManager.getTransaction().begin();
        entityManager.persist(newDot);
        entityManager.getTransaction().commit();
    }

    public Dot getDotById(int id) {
        return entityManager.find(Dot.class, id);
    }

    public void addDots(List<Dot> dotList) {
        entityManager.getTransaction().begin();
        for (Dot dot:dotList) {
            entityManager.persist(dot);
        }
        entityManager.getTransaction().commit();
    }

    public void deleteDotById(int id) {
        entityManager.getTransaction().begin();
        Dot find = entityManager.find(Dot.class, id);
        entityManager.remove(find);
        entityManager.getTransaction().commit();
    }

    public void save5Dots(List<Dot> dots) {
        if(dots.size() > 5) {
            dots = dots.subList(0,5);
        }
        addDots(dots);
    }

}
