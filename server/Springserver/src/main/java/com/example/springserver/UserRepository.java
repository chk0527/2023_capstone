package com.example.springserver;

import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT u.timestamp from User u where u.name= 'Dog found in dumpster' AND u.object = 'dog'")
    List<Integer> findTimeStampByNameAndObject(); //select 문에 무엇을 출력할것인가에 따라 List<>뒤에 형식을 바꾸면 된다. => 전체 출력 시 User로

    @Query("SELECT u from User u where u.name= 'Dog found in dumpster' AND u.object = 'dog'")
    List<User> findByNameAndObject();

    @Query("SELECT u from User u")
    List<User> findAllData();

    @Query("SELECT u from User u where u.link = 'Aqkx40ifYWw' ")
    List<User> findVideo1();

    @Query("SELECT u from User u where u.link = 'gcgwwFPqrSA?list=PLgo6yDyOB1JWJqQFhLvvald4J_fb-wG4y' ")
    List<User> findVideo2();

    @Query("SELECT u from User u where u.link = 'KPjm471GmHA' ")
    List<User> findVideo3();

    @Query("SELECT u from User u where u.link = 'BhejYMbF1TU' ")
    List<User> findVideo4();

    @Query("SELECT u from User u where u.link = 'yyiox2536C0' ")
    List<User> findVideo5();

    @Query("SELECT u from User u where u.link = 'AZsFteT_nGI' ")
    List<User> findVideo6();

    @Query("SELECT u from User u where u.link = 'fROwlX7tW_A' ")
    List<User> findVideo7();

    @Query("SELECT u from User u where u.link = 'y1Dz7-bN8x8' ")
    List<User> findVideo8();

    @Query("SELECT u from User u where u.link = 'fg2qbpVMSaw' ")
    List<User> findVideo9();

    @Query("SELECT u from User u where u.link = 'HN98oskqxos' ")
    List<User> findVideo10();

    @Query("SELECT u from User u where u.link = 'z-j6390UGaw' ")
    List<User> findVideo11();

    @Query("SELECT u from User u where u.link = '5kKMnDiG6Kc' ")
    List<User> findVideo12();

    @Query("SELECT u from User u where u.link = '41sQmLL8qRY' ")
    List<User> findVideo13();
}
